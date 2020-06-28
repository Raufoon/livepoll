import React from 'react'
import { NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import './style.css'

export default function PollNavHeader () {
  const match = useRouteMatch()

  return <div className="PollNavHeader">
    <NavLink to={`${match.url}/`} activeClassName="active">Items</NavLink>
    <NavLink to={`${match.url}/about`} activeClassName="active">About</NavLink>
    <NavLink to={`${match.url}/more`} activeClassName="active">More</NavLink>
  </div>
}
