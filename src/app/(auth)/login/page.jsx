'use client'
import { useState } from 'react'
import { auth, signInWithEmailAndPassword } from '@/configs/firebase'
import styles from './LoginPage.module.css'
import Image from 'next/image'

function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error al iniciar sesión', error)
    }
  }

  return (
    <div className={styles.container}>
      <Image className={styles.backgroundImage} src="https://circontrol.com/wp-content/uploads/2019/02/180125-Circontrol-BAIXA-80.jpg" alt="background"/>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Iniciar sesión</button>
      </form>
    </div>
  )
}

export default LoginPage
