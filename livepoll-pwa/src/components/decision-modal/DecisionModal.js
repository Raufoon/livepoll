import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/Modal'
import './style.css'

export default function DecisionModal (props) {
  const {className, title, onYes, onNo, isVisible} = props

  return (
    <Modal isOpen={isVisible} 
      title={title || 'Are you sure?'}
      onClose={onNo}
      >
      
      <div className='DecisionModal'>
        <button className='confirmBtn' onClick={onYes}>Confirm</button>
        <button onClick={onNo}>Cancel</button>
      </div>
    </Modal>
  )
}

DecisionModal.propTypes = {
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string
}
