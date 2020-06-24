import React from 'react'
import {useDispatch} from 'react-redux'
import LpForm from '../../components/lp-form/LpForm'
import LpField from '../../components/lp-form/LpField'
import { actionCreateNewPoll } from '../../state-management/actions/poll-actions'
import './style.css'

export default function PollCreator(props) {
  const {className} = props
  const dispatch = useDispatch()

  function onSubmit(data) {
    dispatch(actionCreateNewPoll(data))
  }

  return (
    <LpForm className={`PollCreator ${className}`} submitLabel='Create New Poll' onSubmit={onSubmit}>
      <LpField
        className='field' 
        title='Give your poll a nice title'
        Component='input'
        type='text'
        validate={value => value && value.length > 6}
        errorMsg='should be longer than 6'
        name='title'/>
      
      <LpField 
        className='field'
        title='Item should look like'
        Component='select'
        options={[
          {name: 'Text only', value: 'TEXT'},
          {name: 'Text with avatar', value: 'AVATAR_TEXT'},
          {name: 'Image only', value: 'IMAGE_CAPTION'},
          {name: 'Image with caption', value: 'IMAGE'},
        ]}
        defaultValue={'TEXT'}
        name='itemContentType'/>

      <LpField 
        className='field'
        title='When should the poll start?'
        Component='input'
        type='datetime-local'
        validate={value => !!value}
        errorMsg='should not be empty'
        name='startDateTime'/>

      <LpField 
        className='field'
        title='When should the poll end? (Optional)'
        Component='input'
        type='datetime-local'
        name='endDateTime'/>
      
      <LpField 
        className='field'
        title='voter list is visible'
        Component='input'
        type='checkbox'
        defaultValue={false}
        name='shouldShowVoters'/>

      <LpField 
        title='How to use the poll'
        className='field'
        Component='select'
        options={[
          {name: 'Anyone can add item', value: 'PUBLIC'},
          {name: 'Only creator adds item', value: 'PROTECTED'},
          {name: 'Visible with only a link', value: 'PRIVATE'},
        ]}
        defaultValue={'PUBLIC'}
        name='usagePrivacy'/>
      
      <LpField 
        className='field'
        title='Items can be added'
        Component='select'
        options={[
          {name: 'always', value: 'ALWAYS'},
          {name: 'before poll starts', value: 'BEFORE_START'},
        ]}
        defaultValue={'ALWAYS'}
        name='whenToAddItem'/>
      
      <LpField 
        className='field'
        title='Voting can be done by'
        Component='select'
        options={[
          {name: 'ticking only one item', value: 'TICK_ONE'},
          {name: 'ticking items', value: 'TICK_MANY'},
          {name: 'numbering items (1 to 100)', value: 'NUMBER_MANY'},
        ]}
        defaultValue={'TICK_ONE'}
        name='votingSystem'/>
    </LpForm>
  )
}