import React, {useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './style.css'

let modalZindex = 100

export default function Modal(props) {
  const {onClose, isOpen} = props

  const modalElementRef = useRef(false);

  console.log('Rendering Modal')

  useEffect(function effect() {
    const modalRoot = document.getElementById('modal-root')
    modalElementRef.current = document.createElement('div')
    modalZindex++
    modalRoot.appendChild(modalElementRef.current)

    return function clearEffect() {
      modalZindex--
      modalRoot.removeChild(modalElementRef.current)
    }
  }, [])


  return isOpen && !!modalElementRef.current && ReactDOM.createPortal(
    <div className='Modal' style={{zIndex: modalZindex}}>
      <div className='content'>
        <button className="closeBtn" onClick={onClose}>x</button>
        {props.children}
      </div>
    </div>,
    modalElementRef.current
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}
