import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Modal from "../../Modal/Modal";

const openerDefaultStyle = {
  cursor: 'pointer'
};

class ModalOpenerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onModalResult = this.onModalResult.bind(this);
  }
  openModal() {
    this.setState({showModal: true});
  }
  closeModal() {
    this.setState({showModal: false});
  }
  onModalResult(data) {
    this.closeModal();
    if (this.props.onModalResult) this.props.onModalResult(data);
  }
  render() {
    const ModalComponent = this.props.ModalComponent;
    const Opener = this.props.OpenerComponent || Button;
    const OpenerIcon = this.props.OpenerIcon;
    return (
      <React.Fragment>
        {
          this.state.showModal && (
            <Modal onClose={this.closeModal} settings={this.props.modalOptions}>
              <ModalComponent onModalResult={this.onModalResult} {...this.props.childProps}/>
            </Modal>
          )
        }
        {
          (this.props.dontHideOpener || !this.state.showModal) && (
            <Opener
              className={this.props.className}
              style={openerDefaultStyle}
              {...this.props.openerComponentProps}
              onClick={this.openModal}
            >
              { this.props.OpenerIcon && <OpenerIcon/> }
              { this.props.OpenerIcon && <span>&nbsp;&nbsp;</span> }
              &nbsp;
              { this.props.children }
            </Opener>
          )
        }
      </React.Fragment>
    );
  }
}

ModalOpenerButton.propTypes = {
  ModalComponent: PropTypes.func.isRequired,
  onModalResult: PropTypes.func,
  modalOptions: PropTypes.object,
  childProps: PropTypes.object,
  OpenerIcon: PropTypes.func
};

export default ModalOpenerButton