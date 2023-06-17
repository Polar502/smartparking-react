import { getAuth, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, onAuthStateChanged as firebaseAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, off, update, get } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBVMA4Rxd0ZXrV_VwpIbW1d5XebBkq5src',
  authDomain: 'smartparking-502.firebaseapp.com',
  databaseURL: 'https://smartparking-502-default-rtdb.firebaseio.com',
  projectId: 'smartparking-502',
  storageBucket: 'smartparking-502.appspot.com',
  messagingSenderId: '799576081409',
  appId: '1:799576081409:web:b5c243cf748a9bd0f6ac00'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getDatabase(app)

export const signInWithEmail = (email, password) => {
  return firebaseSignInWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChanged = firebaseAuthStateChanged

const providerGoogle = new GoogleAuthProvider()
export const signInWithGoogle = () => signInWithPopup(auth, providerGoogle)
export const createUserWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password)

const initialData = {
  slots: {
    slot1: { isOccupied: false, carDetails: null, owner: null, inOperation: false },
    slot2: { isOccupied: false, carDetails: null, owner: null, inOperation: false },
    slot3: { isOccupied: false, carDetails: null, owner: null, inOperation: false }
  }
}

const initializeDatabase = async () => {
  const slotsRef = ref(db, 'slots')
  try {
    const snapshot = await get(slotsRef)

    if (!snapshot.exists()) {
      try {
        await update(slotsRef, initialData.slots)
        console.log('Database initialized successfully!')
      } catch (error) {
        console.error('Error initializing database: ', error)
      }
    }
  } catch (error) {
    if (error.message.includes('Permission denied')) {
      console.error('No tienes los permisos necesarios para leer o escribir en la base de datos.')
    } else {
      console.error('Error al intentar leer la base de datos: ', error)
    }
  }
}

initializeDatabase()

export const listenToSlotChanges = (callback) => {
  const slotsRef = ref(db, 'slots')
  const listener = onValue(slotsRef, (snapshot) => {
    const slots = snapshot.val()
    callback(slots)
  })

  return () => off(slotsRef, 'value', listener)
}

export const updateSlotStatus = async (slotNumber, isOccupied, carDetails, owner, inOperation) => {
  const slotRef = ref(db, `slots/slot${slotNumber}`)
  try {
    await update(slotRef, { isOccupied, carDetails, owner, inOperation })
    console.log(`Slot ${slotNumber} updated successfully!`)
  } catch (error) {
    console.error(`Error updating slot ${slotNumber}: `, error)
  }
}
