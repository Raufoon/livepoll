import React from 'react';
import Typography from '@material-ui/core/Typography';
import JoinDesktopIcon from '@material-ui/icons/Computer';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../loaders/LPLoader";
import Smartphone from "./desktop-landing-page-content/Smartphone";

const SignUpForm = Loadable({
  loader: ()=>import('../forms/SignupForm/SignUpForm'),
  loading: LPLoader,
});

const styles = theme => ({
  appInfoCard: {
    position: 'absolute',
    top: '10vh',
    left: 60,
  },
  appBigTitle: {
    color: '#fbfbfb',
    textShadow: '-1px 0 #628b57, 0 1px #628b57, 1px 0 #628b57, 0 -1px #628b57'
  },
  appSubtitle: {
    color: '#fbfbfb',
  },
  joinButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#fff',
    backgroundColor: '#065535'
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
  starIcon: {
    color: '#ffff66'
  },
  featText: {
    color: '#fbfbfb',
    textTransform: 'uppercase',
  },
  featchip: {
    margin: '20px',
    backgroundColor: 'transparent',
    marginTop: '10px',
    textTransform: 'uppercase',
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

const LandingPageDesktop = (props) => {
  const {classes} = props;
  return (
    <React.Fragment>
      <div className={classes.appInfoCard}>
        <Typography
          variant="h1"
          className={classes.appBigTitle}
          gutterBottom>Livepoll
        </Typography>
        <Typography
          variant="h5"
          className={classes.appSubtitle}
          gutterBottom>
          Create and manage polls online. Have fun!
        </Typography>
        <br/><br/>
        <List>
          {
            featureList.map(feat => (
              <ListItem button key={feat} >
                <ListItemIcon className={classes.starIcon}><StarIcon/></ListItemIcon>
                <ListItemText inset primary={feat} primaryTypographyProps={{
                  className: classes.featText,
                }} />
              </ListItem>
            ))
          }
        </List>
      </div>
      <ModalOpenerButton
        className={classes.joinButton}
        OpenerIcon={JoinDesktopIcon}
        ModalComponent={SignUpForm}>
        Join Us
      </ModalOpenerButton>
      <Smartphone className={classes.smartphone}/>
      <div className={classes.footer}>
        <div className={classes.footerInner}>
          <FeatChip className={classes.featchip} avatarSrc={REACT_LOGO} label={'Built With React'}/>
          <FeatChip className={classes.featchip} avatarSrc={REDUX_LOGO} label={'Redux State at Worker'}/>
          <FeatChip className={classes.featchip} avatarSrc={PWA_LOGO} label={'Progressive Web App'}/>
          <FeatChip className={classes.featchip} avatarSrc={MAT_UI_LOGO} label={'Material UI'}/>
        </div>
      </div>
    </React.Fragment>
  )
};
export default withStyles(styles)(LandingPageDesktop);