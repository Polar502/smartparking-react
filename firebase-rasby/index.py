import RPi.GPIO as GPIO
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

GPIO.setmode(GPIO.BOARD)

# Carga las credenciales
cred = credentials.Certificate('serviceAccountKey.json')

# Inicializa Firebase
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://smartparking-502-default-rtdb.firebaseio.com'
})

MOTORES = {
    'vertical': {
        'motor_1': {'step_pin': 32, 'dir_pin': 36, 'orientacion': 'high', 'pasos': 100, 'intensidad': 0.0009},
        'motor_2': {'step_pin': 31, 'dir_pin': 33, 'orientacion': 'low', 'pasos': 100, 'intensidad': 0.0009}
    },
    'horizontal': {
        'motor_1': {'step_pin': 16, 'dir_pin': 18, 'orientacion': 'high', 'pasos': 100, 'intensidad': 0.0009},
        'motor_2': {'step_pin': 37, 'dir_pin': 29, 'orientacion': 'low', 'pasos': 100, 'intensidad': 0.0009}
    },
}

def girar(step_pin, dir_pin, orientacion, pasos, intensidad):
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(step_pin, GPIO.OUT)
    GPIO.setup(dir_pin, GPIO.OUT)

    if orientacion == 'low':
        GPIO.output(dir_pin, GPIO.LOW)
    else:
        GPIO.output(dir_pin, GPIO.HIGH)
    
    for _ in range(pasos):
        GPIO.output(step_pin, GPIO.HIGH)
        time.sleep(intensidad)
        GPIO.output(step_pin, GPIO.LOW)
        time.sleep(intensidad)
        
    GPIO.cleanup()

def mover_elevador(nivel, direccion, pasos_por_nivel, fase):
    # Configura los GPIOs de todos los motores antes de iniciar el movimiento
    for motor, config in MOTORES['vertical'].items():
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(config['step_pin'], GPIO.OUT)
        GPIO.setup(config['dir_pin'], GPIO.OUT)

        orientacion = config['orientacion'] if direccion == 'up' else 'high' if config['orientacion'] == 'low' else 'low'
        if orientacion == 'low':
            GPIO.output(config['dir_pin'], GPIO.LOW)
        else:
            GPIO.output(config['dir_pin'], GPIO.HIGH)

    # Ahora, haz que todos los motores den los pasos al mismo tiempo
    for _ in range(nivel * pasos_por_nivel):
        for motor, config in MOTORES['vertical'].items():
            GPIO.output(config['step_pin'], GPIO.HIGH)
        time.sleep(intensidad)
        for motor, config in MOTORES['vertical'].items():
            GPIO.output(config['step_pin'], GPIO.LOW)
        time.sleep(intensidad)

    print(f"Fase {fase}: El elevador se ha movido {direccion} al nivel {nivel}")
    time.sleep(5)
    GPIO.cleanup()  # Limpiar todos los pines GPIO una vez terminado el movimiento

def mover_plataforma(direccion, pasos, fase):
    # Configura los GPIOs de todos los motores antes de iniciar el movimiento
    for motor, config in MOTORES['horizontal'].items():
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(config['step_pin'], GPIO.OUT)
        GPIO.setup(config['dir_pin'], GPIO.OUT)

        orientacion = config['orientacion'] if direccion == 'in' else 'high' if config['orientacion'] == 'low' else 'low'
        if orientacion == 'low':
            GPIO.output(config['dir_pin'], GPIO.LOW)
        else:
            GPIO.output(config['dir_pin'], GPIO.HIGH)

    # Ahora, haz que todos los motores den los pasos al mismo tiempo
    for _ in range(pasos):
        for motor, config in MOTORES['horizontal'].items():
            GPIO.output(config['step_pin'], GPIO.HIGH)
        time.sleep(intensidad)
        for motor, config in MOTORES['horizontal'].items():
            GPIO.output(config['step_pin'], GPIO.LOW)
        time.sleep(intensidad)

    print(f"Fase {fase}: La plataforma se ha movido {direccion}")
    time.sleep(5)
    GPIO.cleanup()  # Limpiar todos los pines GPIO una vez terminado el movimiento

def listener(event):
    if event.data is None or event.path == "/":
        print("No data")
        return
    
    slot = event.path.split('/')[-1]
    if 'isOccupied' in event.data:
        is_occupied = event.data['isOccupied']
        if slot == 'slot1':
            nivel = 1
        elif slot == 'slot2':
            nivel = 2
        elif slot == 'slot3':
            nivel = 3
        elif slot == 'slot4':
            nivel = 4
        else:
            nivel = 5

        if is_occupied:
            mover_elevador(nivel, 'up', MOTORES['vertical']['motor_1']['pasos'], 1)
            mover_plataforma('in', MOTORES['horizontal']['motor_1']['pasos'], 2)
            mover_elevador(nivel, 'down', MOTORES['vertical']['motor_1']['pasos'], 3)
        else:
            mover_elevador(nivel, 'up', MOTORES['vertical']['motor_1']['pasos'], 1)
            mover_plataforma('out', MOTORES['horizontal']['motor_1']['pasos'], 2)
            mover_elevador(nivel, 'down', MOTORES['vertical']['motor_1']['pasos'], 3)

# Escucha los cambios en la base de datos de Firebase
db.reference('/').listen(listener)
