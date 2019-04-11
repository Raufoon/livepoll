import React from 'react';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../loaders/LPLoader";
import Smartphone from "./desktop-landing-page-content/Smartphone";
import ImageButton from "../utils/ImageButton";
import {STAR_URL} from "../../constants/livepoll-constants";

const SignUpForm = Loadable({
  loader: ()=>import('../forms/SignupForm/SignUpForm'),
  loading: LPLoader,
});

const styles = theme => ({
  appInfoCard: {
    position: 'absolute',
    top: '10vh',
    left: 60,
    fontFamily: 'Comfortaa',
  },
  appBigTitle: {
    color: '#ffa500',
    fontSize: '4em',
  },
  appSubtitle: {
    color: '#202624'
  },
  smartphone: {
    position: 'absolute',
    left: '70vw',
    top: '50vh',
    width: '38vh',
    height: '73vh',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '10vh',
    backgroundColor: '#fbfbfb'
  },
  footerInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  featText: {
    fontFamily: 'Comfortaa',
    padding: 10,
  },
  featchip: {
    margin: '10px',
    backgroundColor: 'transparent',
    marginTop: '10px',
    fontWeight: 'bold'
  }
});

const featureList = [
  'Create polls with texts',
  'Manage profile easily',
  'Get poll updates in real-time',
  'Create polls with images & videos (coming soon)',
];

export const FeatChip = props => (
  <Chip
    className={props.className}
    avatar={<Avatar src={props.avatarSrc}/>}
    label={props.label}
    deleteIcon={<DoneIcon />}
  />
);

export const REACT_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Freact-min.png?alt=media&token=bf9f9724-f30d-43ac-9bda-940d77cf82b4';
export const REDUX_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fredux-min.png?alt=media&token=0e05e66f-8e2c-48f5-8dc4-9c54d37ad5c0';
export const PWA_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fpwa-min.png?alt=media&token=1801672c-f07a-4f94-b066-59a377eb1eae';
export const MAT_UI_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fmatui-icon.png?alt=media&token=f00d9ccb-2e49-4603-8b14-ba0ca7e15ab8';

const footerItems = [
  { src: REACT_LOGO, label: 'Built with React' },
  { src: REDUX_LOGO, label: 'Redux State at Worker' },
  { src: PWA_LOGO, label: 'Progressive Web App' },
  { src: MAT_UI_LOGO, label: 'Served with GraphQL' },
];

const LandingPageDesktop = (props) => {
  const {classes} = props;
  return (
    <React.Fragment>
      <div className={classes.appInfoCard}>
        <h1 className={classes.appBigTitle}>Livepoll</h1>
        <h2 className={classes.appSubtitle}>
          Create and manage polls online. Have fun!
        </h2>
        <br/><br/>
        <ul className="pure-menu-list">
          {
            featureList.map(feat => (
              <li key={feat} className={`pure-menu-item ${classes.featText}`}>
                <ImageButton src={STAR_URL} text={feat}/>
              </li>
            ))
          }
        </ul>
      </div>

      <ModalOpenerButton className="pure-button button-xlarge fr mg5" ModalComponent={SignUpForm}>
        Join us
      </ModalOpenerButton>
      <Smartphone className={classes.smartphone}/>
      <div className={classes.footer}>
        <div className={classes.footerInner}>
          {
            footerItems.map(item => (
              <ImageButton
                key={item.label}
                className={classes.featchip}
                src={item.src}
                text={item.label}
                iconHeight={30}/>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  )
};


export default withStyles(styles)(LandingPageDesktop);