import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import LpForm from '../../../../components/lp-form/LpForm'
import LpField from '../../../../components/lp-form/LpField'
import { actionCreateNewItem } from '../../../../state-management/actions/poll-actions'

function TextItemCreator(props) {
  const {pollId, onSubmit} = props
  const dispatch = useDispatch()


  const onSubmitForm = useMemo(function(){
    return function (data) {
      dispatch(actionCreateNewItem(pollId, data))
      if (onSubmit) onSubmit()
    } 
  }, [pollId, onSubmit, dispatch])

  return (
    <div>
      <h3>Create an Item</h3>
      <LpForm onSubmit={onSubmitForm} submitLabel="Create new item">
        <LpField 
          type="type"
          title="Item name"
          Component='input'
          errorMsg="Should be at least 2 letters long"
          validate={value => value && value.length >= 2}
          name="text"/>
      </LpForm>
    </div>
  )
}

TextItemCreator.propTypes = {
  pollId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

export default TextItemCreator
