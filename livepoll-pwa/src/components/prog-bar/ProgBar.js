import React from 'react'
import './style.css'

export default function ProgBar(props) {
  const {className, value} = props

  return <div className={`ProgBar ${className}`}>
    <div className='inner' style={{width: `${value}%`}}>
      &nbsp;
    </div>
  </div>
}
