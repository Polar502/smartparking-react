'use client'

import { useEffect, useState } from 'react'
import CarDetailsDialog from '@/components/CarDetailsDialog'
import { auth, listenToSlotChanges, updateSlotStatus } from '@/lib/firebase'
import Image from 'next/image'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

const HomePage = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentSlotIndex, setCurrentSlotIndex] = useState(null)
  const [slots, setSlots] = useState([
    { isOccupied: false, carDetails: null },
    { isOccupied: false, carDetails: null },
    { isOccupied: false, carDetails: null }
  ])

  const handleDialogOpen = (index) => {
    setCurrentSlotIndex(index)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  useEffect(() => {
    const unsubscribe = listenToSlotChanges((newSlots) => {
      if (newSlots) {
        setSlots([
          newSlots.slot1,
          newSlots.slot2,
          newSlots.slot3
        ])
      }
    })

    return () => unsubscribe()
  }, [])

  const handleDialogSave = (carDetails) => {
    if (!slots[currentSlotIndex].inOperation) {
      setSlots((prevSlots) => {
        const newSlots = [...prevSlots]
        newSlots[currentSlotIndex].isOccupied = true
        newSlots[currentSlotIndex].carDetails = carDetails
        newSlots[currentSlotIndex].owner = auth.currentUser.uid
        newSlots[currentSlotIndex].inOperation = true
        updateSlotStatus(currentSlotIndex + 1, true, carDetails, auth.currentUser.uid, true)
        return newSlots
      })
    } else {
      toast.error('No se puede iniciar una nueva operación porque el slot ya está en operación.')
    }
    handleDialogClose()
  }

  const handleCarRemoval = (index) => {
    if (slots[index].owner === auth.currentUser.uid || auth.currentUser.uid === '5j8wBGiQRZWf8OZy8b3L9QLhHpV2') {
      if (!slots[index].inOperation) {
        setSlots((prevSlots) => {
          const newSlots = [...prevSlots]
          newSlots[index].isOccupied = false
          newSlots[index].carDetails = null
          newSlots[index].owner = null
          newSlots[index].inOperation = true
          updateSlotStatus(index + 1, false, null, null, true)
          return newSlots
        })
      } else {
        toast.error('No se puede iniciar una nueva operación porque el slot ya está en operación.')
      }
    } else {
      toast.error('No tienes permisos para bajar este vehículo.')
    }
  }

  return (
    <>
      <div className='mt-10 flex h-[90vh] w-full flex-col items-center justify-center gap-6 bg-gray-700'>
        {slots.map((slot, index) => (
          <div
            key={index}
            onClick={() => slot?.isOccupied ? handleCarRemoval(index) : handleDialogOpen(index)}
            className={`group relative flex h-[25%] items-center rounded-lg border-2 xss:w-[90%] xs:w-[80%] md:w-[40%] ${
              slot?.isOccupied ? 'border-solid border-blue-500 bg-slate-500' : 'border-dashed border-slate-300'
            } p-3 text-sm font-medium leading-6 text-slate-900 transition-all duration-300 hover:border-solid hover:border-blue-500 hover:bg-slate-200 hover:text-blue-500`}
          >
            <div className='absolute left-4 top-0 -ml-6 flex h-full items-center'>
              <div className='-rotate-90 text-2xl font-bold text-blue-400 group-hover:text-black'>Slot 0{index + 1}</div>
            </div>
            {slot?.isOccupied
              ? (
                <div className='flex w-full flex-col items-center justify-center'>
                  <h1 className='mt-2 text-xl font-semibold text-white group-hover:text-black'>Bajar Vehículo</h1>
                  <Image src='/car.png' alt='car active' width={100} height={100} />
                </div>
              )
              : (
                <div className='flex w-full flex-col items-center justify-center'>
                  <h1 className='text-xl font-semibold'>Subir Vehículo</h1>
                  <FaPlus className='text-2xl' />
                </div>
              )}
          </div>
        ))}
      </div>
      {dialogOpen && (
        <CarDetailsDialog open={dialogOpen} handleClose={handleDialogClose} handleSave={handleDialogSave} />
      )}
      <button
        className='absolute bottom-0 right-0 rounded-lg bg-blue-500 p-2 text-white'
        onClick={() => {
          toast.success('Test toast')
          console.log('Test toast')
        }}
      >
  Test toast
      </button>

    </>
  )
}

export default HomePage
