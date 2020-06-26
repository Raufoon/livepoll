import React from 'react'
import IconButton from '../icon-button/IconButton'
import homeIcon from '../app-sidebar/images/home.png'
import './style.css'

export default function NavHeader(props) {
  const {className} = props

  return (
    <div className={`NavHeader ${className}`}>
      <IconButton
        to={'/'}
        className="iconBtn"
        iconClass="icon"
        iconUrl={homeIcon}
        tooltip="Home"/>

      <IconButton 
        to={'/'}
        className="iconBtn"
        iconClass="icon"
        iconUrl={homeIcon}
        tooltip="Trending"/>

      <IconButton 
        to={'/'}
        className="iconBtn"
        iconClass="icon"
        iconUrl={homeIcon}
        tooltip="Most Popular"/>
    </div>
  )
}
