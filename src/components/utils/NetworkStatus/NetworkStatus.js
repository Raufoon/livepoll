import React from 'react'
import Typography from "@material-ui/core/Typography/Typography";
import {Offline} from "react-detect-offline";
import Paper from "@material-ui/core/Paper/Paper";

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
  <Paper elevation={1}>
    <Offline>
      <Typography variant={'button'} style={styles.offlineNotifier}>You are offline</Typography>
    </Offline>
  </Paper>
);

export default NetworkStatus;