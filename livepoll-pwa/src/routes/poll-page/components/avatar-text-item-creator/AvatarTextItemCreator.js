import React, {useState, useMemo, useRef} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import LpForm from '../../../../components/lp-form/LpForm'
import LpField from '../../../../components/lp-form/LpField'
import { actionCreateNewItem } from '../../../../state-management/actions/poll-actions'
import { doSecurePostRequest } from '../../../../services/network'
import './style.css'

function AvatarTextItemCreator(props) {
  const dispatch = useDispatch()
  const [avatarUrl, setAvatarUrl] = useState(false)
  const avatarInputRef = useRef() 
  const [avatarState, setAvatarState] = useState('NOT_UPLOADED')

  const {pollId, onSubmit} = props
  
  const onSubmitForm = useMemo(function(){
    return function onSubmitForm(data) {
      dispatch(actionCreateNewItem(pollId, {
        ...data,
        imgUrl: avatarUrl
      }))
      if (onSubmit) onSubmit()
    } 
  }, [pollId, avatarUrl, dispatch, onSubmit])

  async function uploadAvatar() {
    setAvatarState('UPLOADING')

    const {files} = avatarInputRef.current
    const formData = new FormData()
    formData.append('item_avatar', files[0])

    try {
      const {uploadedImgUrl} = await doSecurePostRequest('/upload/avatar', formData)
      setAvatarUrl(uploadedImgUrl)
      setAvatarState('UPLOADED')
    }
    catch(err) {
      setAvatarState('ERROR')
      console.log(err)
    }
  }

  return (
    <div className='AvatarTextItemCreator'>
      <label className="row title"> Create Item with Text and Avatar</label>
      
      {
        !avatarUrl && avatarState === 'NOT_UPLOADED' && <>
          <label className="row">Step 1: Upload an Avatar Image</label>
          <input className="row" ref={avatarInputRef} name='item_avatar' type='file' accept='image/*'/>
          <button className="row" onClick={uploadAvatar}>Upload</button>
        </>
      }

      {
        avatarState === 'UPLOADING' && <span className="row">Uploading... Please wait!</span>
      }

      {
        avatarState === 'ERROR' && <span className="row err">Upload failed!!!</span>
      }

      {
        avatarUrl && avatarState === 'UPLOADED' && <>
          <label className="row">Here is your uploaded avatar:</label>
          <img className="row" src={avatarUrl} alt='Uploaded item avatar'/>
          <label className="row">Step 2: Add a Title for the Item</label> 
        </>
      }

      {
        avatarUrl && avatarState === 'UPLOADED' && <LpForm className="row" onSubmit={onSubmitForm} submitLabel="Create new item">
          <LpField 
            type="type"
            title="Item name"
            Component='input'
            errorMsg="Should be at least 2 letters long"
            validate={value => value && value.length >= 2}
            name="text"/>
        </LpForm>
      }
    </div>
  )
}

AvatarTextItemCreator.propTypes = {
  pollId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

export default AvatarTextItemCreator
