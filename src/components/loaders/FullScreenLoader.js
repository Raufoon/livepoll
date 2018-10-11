import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper";

const styles = {
  fullScreenLoader: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: 3000,
    backgroundColor: 'transparent'
  },
  loader: {
    marginTop: '50vh',
    marginLeft: '50vw',
    float: 'left',
    transform: 'translateX(-50%) translateY(-50%)',
    textAlign: 'center',
    backgroundColor: 'white'
  },
  button: {
    color: '#636363',
    fontSize: 'large',
    textTransform: 'none'
  },
  colorPrimary: {
    backgroundColor: '#fdf893',
  },
  barColorPrimary: {
    backgroundColor: '#d3db5c',
  },
};


const FullScreenLoader = (props) => (
  <div className={props.classes.fullScreenLoader}>
    <Paper className={props.classes.loader} elevation={1}>
      <LinearProgress
        classes={{
          colorPrimary: props.classes.colorPrimary,
          barColorPrimary: props.classes.barColorPrimary
        }}/>
      <Button className={props.classes.button} size="large">
        {props.message}
      </Button>
      <LinearProgress
        variant="query"
        classes={{
          colorPrimary: props.classes.colorPrimary,
          barColorPrimary: props.classes.barColorPrimary
        }}/>
    </Paper>
  </div>
);

FullScreenLoader.propTypes = {
  message: PropTypes.string
};

export default withStyles(styles)(FullScreenLoader)