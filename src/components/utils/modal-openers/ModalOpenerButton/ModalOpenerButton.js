import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Loadable from 'react-loadable';
import LPLoader from "../../../loaders/LPLoader";
import ImageButton from "../../ImageButton";

const Modal = Loadable({
  loader: ()=>import('../../../Modal/Modal'),
  loading: LPLoader,
});

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
    const {
      className,
      ModalComponent,
      modalOptions,
      OpenerComponent,
      childProps,
      dontHideOpener,
      openerComponentProps,
    } = this.props;

    const Opener = OpenerComponent || ImageButton;

    return (
      <React.Fragment>
        {
          this.state.showModal && (
            <Modal onClose={this.closeModal} settings={modalOptions}>
              <ModalComponent onModalResult={this.onModalResult} {...childProps}/>
            </Modal>
          )
        }
        {
          (dontHideOpener || !this.state.showModal) && (
            <Opener
              className={className}
              style={openerDefaultStyle}
              {...openerComponentProps}
              onClick={this.openModal}
            >
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
};

export default ModalOpenerButton