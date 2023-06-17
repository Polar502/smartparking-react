import firebase_admin
import time
from firebase_admin import credentials
from firebase_admin import db
from lib.motor import girar

# Carga las credenciales
cred = credentials.Certificate('serviceAccountKey.json')

# Inicializa Firebase
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://smartparking-502-default-rtdb.firebaseio.com'
})

MOTORES = {
    'vertical': {
        'motor_1': {'step_pin': 36, 'dir_pin': 32, 'orientacion': 'high', 'pasos': 300, 'intensidad': 0.0009},
        'motor_2': {'step_pin': 37, 'dir_pin': 33, 'orientacion': 'low', 'pasos': 300, 'intensidad': 0.0009}
    },
    'horizontal': {
        'motor_1': {'step_pin': 31, 'dir_pin': 29, 'orientacion': 'high', 'pasos': 300, 'intensidad': 0.0009},
        'motor_2': {'step_pin': 36, 'dir_pin': 32, 'orientacion': 'low', 'pasos': 300, 'intensidad': 0.0009}
    },
}

def mover_elevador(nivel, direccion, pasos_por_nivel, fase):
    for motor, config in MOTORES['vertical'].items():
        pasos = nivel * pasos_por_nivel
        orientacion = config['orientacion'] if direccion == 'up' else 'high' if config['orientacion'] == 'low' else 'low'
        girar(config['step_pin'], config['dir_pin'], orientacion, pasos, config['intensidad'])
        print(f"Fase {fase}: El elevador se ha movido {direccion} al nivel {nivel}")
        time.sleep(5)

def mover_plataforma(direccion, pasos, fase):
    for motor, config in MOTORES['horizontal'].items():
        orientacion = config['orientacion'] if direccion == 'in' else 'high' if config['orientacion'] == 'low' else 'low'
        girar(config['step_pin'], config['dir_pin'], orientacion, pasos, config['intensidad'])
        print(f"Fase {fase}: La plataforma se ha movido {direccion}")
        time.sleep(5)

# Define la función listener
def listener(event):
    print(event.data)  # este es el nuevo estado de los slots
    slot = event.path.split('/')[-1]  # obtén el nombre del slot que cambió
    if 'isOccupied' in event.data:
        is_occupied = event.data['isOccupied']  # obtén el nuevo estado de ocupación
        if slot == 'slot1':
            nivel = 1  # Si el slot 1 se ocupa, el vehículo debe ir al nivel 1
        elif slot == 'slot2':
            nivel = 2  # Si el slot 2 se ocupa, el vehículo debe ir al nivel 2
        elif slot == 'slot3':
            nivel = 3  # Si el slot 3 se ocupa, el vehículo debe ir al nivel 3
        else:
            nivel = 0  # Si se libera un slot, el vehículo debe bajar al nivel 0

        slot_ref = db.reference(f'slots/{slot}')
        slot_ref.update({'inOperation': True})

        if is_occupied:
            # nivel, direccion, pasos_por_nivel, fase
            mover_elevador(nivel, 'up', MOTORES['vertical']['motor_1']['pasos'], 1)
            mover_plataforma('in', 1000, 2)
            mover_elevador(1, 'down', 500, 3)
            mover_plataforma('out', 1000, 4)
            mover_elevador(nivel, 'down', MOTORES['vertical']['motor_1']['pasos'], 5)
        else:
            #direccion, pasos, fase
            mover_elevador(nivel, 'up', MOTORES['vertical']['motor_1']['pasos'], 1)
            mover_plataforma('in', 1000, 2)
            mover_elevador(1, 'up', 500, 3)
            mover_plataforma('out', 1000, 4)
            mover_elevador(nivel, 'down', MOTORES['vertical']['motor_1']['pasos'], 5)

        slot_ref.update({'inOperation': False})

db.reference('slots').listen(listener)
