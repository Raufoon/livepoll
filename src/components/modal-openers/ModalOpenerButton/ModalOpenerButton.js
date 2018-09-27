import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Modal from "../../Modal/Modal";

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

    return this.state.showModal ? (
      <Modal onClose={this.closeModal} settings={this.props.modalOptions}>
        <ModalComponent onModalResult={this.onModalResult} {...this.props.childProps}/>
      </Modal>
    ):(
      <Button
        className={this.props.className}
        {...this.props.buttonProps}
        onClick={this.openModal}>
        {
          this.props.children
        }
      </Button>
    )
  }
}

ModalOpenerButton.propTypes = {
  ModalComponent: PropTypes.func.isRequired,
  onModalResult: PropTypes.func,
  modalOptions: PropTypes.object,
  childProps: PropTypes.object,
};

export default ModalOpenerButton