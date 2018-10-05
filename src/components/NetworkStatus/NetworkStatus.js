import React from 'react'
import Typography from "@material-ui/core/Typography/Typography";
import {Offline, Online} from "react-detect-offline";

const styles = {
  offlineNotifier: {
    width: '100vw',
    backgroundColor: '#ffff66',
    color: '#222',
    textAlign: 'center'
  },
  // onlineNotifier: {
  //   width: '100vw',
  //   backgroundColor: '#6dc066',
  //   color: 'white',
  //   textAlign: 'center'
  // }
};

const NetworkStatus = props => (
  <React.Fragment>
    <Offline>
      <Typography variant={'body1'} style={styles.offlineNotifier}>You are offline</Typography>
    </Offline>
  </React.Fragment>
);

export default NetworkStatus;