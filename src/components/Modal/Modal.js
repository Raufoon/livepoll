import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

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
    const modalSettings = this.props.settings || {};

    return ReactDOM.createPortal(
      <div className={'modal-overlay'}>
        <Paper className='modal-container modal-container-resp' style={{zIndex: this.zIndex}}>
          {
            !modalSettings.hideCloseButton && (
              <button className='modal-close-btn' onClick={this.props.onClose}>X</button>
            )
          }
          <div className='modal-content'>
            { this.props.children }
          </div>
        </Paper>
      </div>,
      this.modalDomParent
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;