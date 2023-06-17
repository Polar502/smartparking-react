'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import { auth, createUserWithEmail, providerGoogle, signInWithEmail, signInWithGoogle } from '@/lib/firebase'

export default function HomePage () {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleButtonClick = async () => {
    try {
      if (isRegistering) {
        await createUserWithEmail(email, password)
      } else {
        await signInWithEmail(email, password)
      }
      router.push('/home')
    } catch (error) {
      alert(error.message)
    }
  }

  const handleGoogleLoginClick = async () => {
    try {
      await signInWithGoogle(providerGoogle)
      router.push('/home')
    } catch (error) {
      alert(error.message)
    }
  }

  // const handlePasswordResetClick = async () => {}

  // si ya existe una sesión activa, redirigir a /home
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/home')
      }
    })
    return unsubscribe
  }, [])

  return (
    <div className="grid h-screen w-full place-items-center bg-gray-800 px-3">
      <div className="mx-auto my-0 w-full max-w-7xl px-3 py-0 sm:px-5 lg:px-12">
        <div className="rounded-xl bg-white sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
            <div className="hidden lg:col-span-5 lg:block">
              <img
                src="https://apcpark.com/wp-content/uploads/2016/12/TPS.jpg"
                className="btn- h-full w-full rounded-2xl object-cover"
              />
            </div>
            <div className="p-8 lg:col-span-7">
              <p className="mb-4 text-left font-extrabold leading-snug tracking-tight text-gray-900 md:text-4xl">Inicia Sesion</p>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleGoogleLoginClick}
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-800 px-0 py-3 text-white hover:bg-gray-600">
                    <FcGoogle className='mr-2 h-5 w-5'/>
                    <p className="text-xl">Google</p>
                  </button>
                  <button className="border- inline-flex w-full cursor-pointer items-center justify-center rounded-md border-2
                  border-gray-300 bg-white px-0 py-3 text-gray-800">
                    <BsApple className='mr-2 h-5 w-5'/>
                    <p className="text-xl">Apple</p>
                  </button>
                </div>
                <p className="border-b-2 border-gray-100 px-0 pb-2 pt-4 text-center text-sm text-gray-600">O</p>
              </div>
              <div>
                <div className="mx-auto my-3 w-full">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mx-0 mb-0 mt-1">
                    <input placeholder="Ex: james@bond.com" type="email"
                      onChange={e => setEmail(e.target.value)}
                      className="block h-10 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
                <div className="mx-auto mb-3 mt-0 w-full">
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <div className="mx-0 mb-0 mt-1">
                    <input placeholder="********" type="password"
                      onChange={e => setPassword(e.target.value)}
                      className="block h-10 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
                <button
                  onClick={handleButtonClick}
                  className="w-full rounded-md bg-gray-800 p-3 text-center text-xl font-semibold text-white hover:bg-gray-600"
                >
                  {isRegistering ? 'Registrar' : 'Iniciar sesión'}
                </button>

                <div className="mx-0 mb-0 mt-6 flex items-center justify-start border-t-2 border-gray-100 px-0 pb-0 pt-6">
                  <p className="text-sm text-gray-800">
                    {isRegistering ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}
                  </p>
                  <a
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="my-0 ml-2 mr-0 text-sm text-blue-500"
                  >
                    {isRegistering ? 'Iniciar sesión' : 'Registrar'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
