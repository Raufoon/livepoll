import React from 'react'
import useHomeData from './hooks/useHomeData'

export default function HomePage () {
  const [polls] = useHomeData()

  return (
    <div>
      Welcome home
    </div>
  )
}
