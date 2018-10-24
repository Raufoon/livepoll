import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = props => ({
  progress: {
    margin: 5
  }
});

const LPLoader = props => {
  const {classes} = props;
  return (
    <div>
      <CircularProgress className={classes.progress} style={{color: '#00a562'}} />
      <CircularProgress className={classes.progress} style={{color: '#d3db5c'}} />
      <CircularProgress className={classes.progress} style={{color: '#fdf893'}} />
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  )
};

export default withStyles(styles)(LPLoader)