import Button from "@material-ui/core/Button/Button";
import MoreIcon from '@material-ui/icons/MoreHoriz';
import React from "react";
import Paper from "@material-ui/core/Paper";

const loader = {
  marginTop: '50vh',
  marginLeft: '50vw',
  float: 'left',
  transform: 'translateX(-50%) translateY(-50%)',
  textAlign: 'center',
  backgroundColor: 'white'
};

const button = {
  color: '#636363',
  fontSize: 'large',
};

const image = {
  width: '150px',
  height: '150px'
};

const CentralLoader = () => (
  <Paper style={loader} elevation={1}>
    <img src={'/images/app-icon/launcher-icon.png'} style={image}/>
    <br/>
    <Button style={button} size="large" className={'blink1s'}>
      <MoreIcon/>&nbsp;&nbsp;Loading
    </Button>
  </Paper>
);

export default CentralLoader