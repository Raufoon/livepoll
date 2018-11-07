import React from 'react';
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
    overflow: 'hidden'
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
  },
  eachSlide: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transition: '1.5s',
  },
  screenInner: {
    width: '100%',
    height: '100%',
    position: 'relative'
  }
});

const slideImages = [
  'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fmobile-slides%2FScreenshot_20181107-140756.png?alt=media&token=82b1ae6d-de7c-46ad-827f-4ead9d1196c9',
  'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fmobile-slides%2FScreenshot_20181107-140448.png?alt=media&token=43bf4764-d8e8-4f9b-8bfe-7d1c6dc02c26',
  'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fmobile-slides%2FScreenshot_20181107-140517.png?alt=media&token=666ea0b1-38a5-44d4-97d1-aa9f5d88e875',
  'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fmobile-slides%2FScreenshot_20181107-140646.png?alt=media&token=e71b7e2f-fa1d-4c1c-9dcc-df1d0e7c1fa1',
  'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fmobile-slides%2FScreenshot_20181107-140710.png?alt=media&token=4735d43e-c305-4fce-a122-c6e53c5380b0',
  'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fmobile-slides%2FScreenshot_20181107-140748.png?alt=media&token=91ea3f06-2360-4e5c-afc3-8b914a5977d8',
];

class Smartphone extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      slideImages: slideImages.slice(),
    };
    this.slideMargins = [];
    for (let i=0; i<slideImages.length;i++) {
      this.slideMargins.push(((i-1) * 100) + '%');
    }
  }

  componentDidMount() {
    this.slideInterval = setInterval(() => {
      let images = this.state.slideImages.slice();
      images.push(images[0]);
      images.shift();
      this.setState({
        slideImages: images
      })
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.slideInterval);
  }

  render() {
    const classes = this.props.classes;
    return (
      <Paper elevation={2} className={`${classes.shell} ${this.props.className}`}>
        <div className={classes.content}>
          <b className={classes.speaker}>......</b>
          <div className={classes.screen}>
            <div className={classes.screenInner}>
              {
                this.state.slideImages.map((img, idx) => (
                  <img className={classes.eachSlide} style={{left: this.slideMargins[idx]}} key={img} src={img}/>
                ))
              }
            </div>
          </div>
          <Button size='small' variant={'raised'} className={classes.homebutton}/>
        </div>
      </Paper>
    )
  }
}

export default withStyles(style)(Smartphone);