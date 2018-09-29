import React from 'react'
import {connect} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';

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
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        var
        onClose={this.handleClose}
        message={<span>{this.props.newToast.msg}</span>}
      >
      </Snackbar>
    );
  }
}
const s2p = state => ({
  newToast: state.toast.newToast
});

export default connect(s2p)(ToastDisplayer);