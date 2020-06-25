import React from 'react'
import ProfileEditor from './components/profile-editor/ProfileEditor'
import './style.css'

export default function ProfileSettings () {
  return (
    <div className='ProfileSettings'>
      <header className='sectionLabel'>Settings</header>
      
      <div className='subSection'>
        <header>Profile</header>
        <ProfileEditor className='detailsEditor'/>
      </div>

      <div className='subSection'>
        <header>App</header>
        <label>
          <input type='checkbox'/>
          Dark Mode
        </label>
      </div>

      <div className='subSection'>
        <header>Account</header>
        <button>Delete my account</button>
      </div>
    </div>
  )
}
