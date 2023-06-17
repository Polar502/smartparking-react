import { getAuth, signInWithEmailAndPassword as signIn, onAuthStateChanged as firebaseAuthStateChanged } from 'firebase/auth'

import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

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
export const db = getDatabase(app)
export const signInWithEmailAndPassword = signIn
export const onAuthStateChanged = firebaseAuthStateChanged
