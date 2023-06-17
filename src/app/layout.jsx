'use client'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { cn } from '@/lib/utils'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SmartParking',
  description: 'SmartParking'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="es">
      <body className={cn(
        inter.className,
        'grid w-[100vw] place-items-center bg-gray-800'
      )}>
        <ToastContainer
          position="top-center"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          theme='dark'
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
        <main className="bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  )
}
