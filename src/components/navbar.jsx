'use client'

import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ImExit } from 'react-icons/im'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const node = useRef()
  const router = useRouter()

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // Dentro de click
      return
    }
    // Fuera de click
    setIsOpen(false)
  }

  const handleLogoutClick = async () => {
    try {
      await auth.signOut()
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    // Limpieza al desmontar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-[100vw] bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <div className="block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Mas elementos */}
              </div>
            </div>
          </div>
          <div className="block">
            <div className="ml-4 flex items-center md:ml-6">
              <div ref={node}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {/* Icono de menú */}
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute right-0 mx-2 mr-4 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button className="w-full rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogoutClick}>
                      <ImExit className= "mr-3 inline-block h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
