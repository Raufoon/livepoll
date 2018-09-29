import React from 'react'
import {connect} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import {TOAST_TYPES} from "../../constants/toast";

class ToastDisplayer extends React.Component {
  state = {
    open: false,
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  componentDidUpdate(newProps) {
    if (newProps.newToast && this.props.newToast) {
      if (newProps.newToast.key !== this.props.newToast.key) {
        this.setState({open: true});
      }
    }
  }

  render() {
    if (!this.props.newToast) return false;
    let toastMsgStyle = {};
    switch (this.props.newToast.type) {
      case TOAST_TYPES.ERROR:
        toastMsgStyle.backgroundColor = '#ff4444';
        toastMsgStyle.color = 'white';
        break;
      case TOAST_TYPES.INFO:
        toastMsgStyle.backgroundColor = '#2c7db2';
        toastMsgStyle.color = 'white';
        break;
      case TOAST_TYPES.SUCCESS:
        toastMsgStyle.backgroundColor = '#407f00';
        toastMsgStyle.color = 'white';
        break;
      case TOAST_TYPES.WARNING:
        toastMsgStyle.backgroundColor = '#fef65b';
        toastMsgStyle.color = 'black';
        break;
      default:
        break;
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={this.props.newToast.duration}
        onClose={this.handleClose}
      >
        <SnackbarContent
          style={toastMsgStyle}
          message={
            <span>{this.props.newToast.msg}</span>
          }/>
      </Snackbar>
    );
  }
}
const s2p = state => ({
  newToast: state.toast.newToast
});

export default connect(s2p)(ToastDisplayer);