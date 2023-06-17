import Navbar from '@/components/navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function HomeLayout ({ children }) {
  return <div className=" h-screen w-[100vw] overflow-hidden bg-gray-700">
    <Navbar />
    {children}
    <ToastContainer
      position="top-right"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable={false}
      pauseOnVisibilityChange
      closeOnClick
      pauseOnHover
    />
  </div>
}
