import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import LpForm from '../../../../components/lp-form/LpForm'
import LpField from '../../../../components/lp-form/LpField'
import { actionCreateNewItem } from '../../../../state-management/actions/poll-actions'
import { doSecurePostRequest } from '../../../../services/network'

function AvatarTextItemCreator(props) {
  const {pollId} = props
  const dispatch = useDispatch()
  const [avatarUrl, setAvatarUrl] = useState(false)
  const avatarInputRef = useRef() 

  function onSubmit(data) {
    dispatch(actionCreateNewItem(pollId, {
      ...data,
      imgUrl: avatarUrl
    }))
  }

  async function uploadAvatar() {
    const {files} = avatarInputRef.current
    const formData = new FormData()
    formData.append('item_avatar', files[0])
    try {
      const {uploadedImgUrl} = await doSecurePostRequest('/upload/avatar', formData)
      setAvatarUrl(uploadedImgUrl)
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h3>Add an item with text and avatar</h3>
      {
        !avatarUrl && <div>
          <h3>Upload an avatar image</h3>
          <input ref={avatarInputRef} name='item_avatar' type='file' accept='image/*'/>
          <button onClick={uploadAvatar}>Upload</button>
        </div>
      }

      {
        avatarUrl && <img src={avatarUrl}/>
      }

      {
        avatarUrl && <LpForm onSubmit={onSubmit} submitLabel="Create new item">
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
  pollId: PropTypes.string.isRequired
}

export default AvatarTextItemCreator
