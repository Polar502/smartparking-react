import RPi.GPIO as GPIO

# import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

def girar(step_pin, dir_pin, orientacion, pasos, intensidad):
    GPIO.setup(step_pin, GPIO.OUT)
    GPIO.setup(dir_pin, GPIO.OUT)

    # Configuración de la dirección del motor (0 para un sentido, 1 para el sentido contrario)
    if orientacion == 'low':
        GPIO.output(dir_pin, GPIO.LOW)
    else:
        GPIO.output(dir_pin, GPIO.HIGH)
    
    # Girar el motor
    for _ in range(pasos):  # Cambia el valor según la cantidad de pasos que desees dar
        GPIO.output(step_pin, GPIO.HIGH)
        time.sleep(intensidad)  # Ajusta el tiempo según la velocidad deseada
        GPIO.output(step_pin, GPIO.LOW)
        time.sleep(intensidad)

    # Limpieza de los pines GPIO
    GPIO.cleanup()

