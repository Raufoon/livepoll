import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import './Modal.css';

let modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  static zIndex = 3000;

  constructor(props) {
    super(props);
    this.zIndex = ++Modal.zIndex;
    this.modalDomParent = document.createElement('div');
    modalRoot.appendChild(this.modalDomParent);

    this.onEscape = this.onEscape.bind(this);
    this.onBackPressed = this.onBackPressed.bind(this);
  }

  onEscape(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  }

  onBackPressed(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();
    this.props.onClose();
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onEscape);
  }

  componentWillUnmount() {
    Modal.zIndex--;
    modalRoot.removeChild(modalRoot.lastChild);
    document.removeEventListener('keyup', this.onEscape);
  }

  render() {
    const modalSettings = this.props.settings || {};

    return ReactDOM.createPortal(
      <div className={'modal-overlay'}>
        <Paper className='modal-container modal-container-resp' style={{zIndex: this.zIndex}}>
          {
            !modalSettings.hideCloseButton && (
              <Button className='modal-close-btn' onClick={this.props.onClose}><CloseIcon/></Button>
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