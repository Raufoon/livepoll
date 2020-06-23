import {useState} from 'react'

export default function useModal() {
  const [isOpen, setOpenStatus] = useState(false)

  function openModal() {
    setOpenStatus(true)
  }

  function closeModal() {
    setOpenStatus(false)
  }

  return [isOpen, openModal, closeModal]
}
