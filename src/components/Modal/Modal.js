import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

let modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  static zIndex = 3000;

  constructor(props) {
    super(props);
    this.zIndex = ++Modal.zIndex;
    this.modalDomParent = document.createElement('div');
    modalRoot.appendChild(this.modalDomParent);
  }

  componentWillUnmount() {
    Modal.zIndex--;
    modalRoot.removeChild(modalRoot.lastChild);
  }

  render() {
    return ReactDOM.createPortal(
      <div className='modal-container' style={{zIndex: this.zIndex}}>
        <button className='modal-close-btn' onClick={this.props.onClose}>
          X
        </button>
        <br/>
        {
          this.props.children
        }
      </div>,
      this.modalDomParent
    )
  }
}

export default Modal;