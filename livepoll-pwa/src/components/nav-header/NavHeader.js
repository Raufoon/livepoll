import React from 'react'
import IconButton from '../icon-button/IconButton'
import trendingIcon from './images/trending.png'
import recentIcon from './images/recent.png'
import popularIcon from './images/popular.png'
import './style.css'

export default function NavHeader(props) {
  const {className} = props

  return (
    <div className={`NavHeader ${className}`}>
      <IconButton
        to={'/trending'}
        className="iconBtn"
        iconClass="icon"
        activeClassName="active"
        iconUrl={trendingIcon}>Trending</IconButton>

      <IconButton 
        to={'/recent'}
        className="iconBtn"
        iconClass="icon"
        activeClassName="active"
        iconUrl={recentIcon}>Recent</IconButton>

      <IconButton 
        to={'/popular'}
        className="iconBtn"
        iconClass="icon"
        activeClassName="active"
        iconUrl={popularIcon}>Popular</IconButton>
    </div>
  )
}
