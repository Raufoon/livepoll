import React from 'react';
import PropTypes from 'prop-types';

import Modal from "../../Modal/Modal";

class ClickModalOpener extends React.Component {
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
    this.props.onModalResult(data);
  }

  render() {
    const ModalComponent = this.props.ModalComponent;

    return this.state.showModal ? (
      <Modal onClose={this.closeModal}>
        <ModalComponent onResult={this.onModalResult}/>
      </Modal>
    ):(
      <button
        className={this.props.className}
        onClick={this.openModal}>
        {
          this.props.children
        }
      </button>
    )
  }
}

ClickModalOpener.propTypes = {
  ModalComponent: PropTypes.func,
  onModalResult: PropTypes.func
};

export default ClickModalOpener