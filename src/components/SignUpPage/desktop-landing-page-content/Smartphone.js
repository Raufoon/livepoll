import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const style = props => ({
  shell: {
    border: '1px solid lightgray',
    borderRadius: 10,
    borderBottomLeftRadius: 20 ,
    borderBottomRightRadius: 20 ,
    backgroundColor: '#fbfbfb',
  },
  content: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  screen: {
    position: 'absolute',
    width: '90%',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-53%)',
    border: '1px solid #a3a3a3',
    borderRadius: 2,
    padding: 0,
  },
  speaker: {
    position: 'absolute',
    top: '1%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 'x-large',
    color: '#a3a3a3'
  },
  homebutton: {
    position: 'absolute',
    bottom: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    height: 10,
    minHeight: 10,
    border: '1px solid #a3a3a3',
    boxShadow: 'none',
    backgroundColor: 'inherit'
  }
});

const Smartphone = props => {
  // const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  return (
    <Paper elevation={2} className={`${props.classes.shell} ${props.className}`}>
      <div className={props.classes.content}>
        <b className={props.classes.speaker}>......</b>
        <div className={props.classes.screen}>
        </div>
        <Button size='small' variant={'raised'} className={props.classes.homebutton}/>
      </div>
    </Paper>
  )
};

export default withStyles(style)(Smartphone);