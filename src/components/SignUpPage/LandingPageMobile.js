import React from 'react';
import Typography from '@material-ui/core/Typography';
import JoinMobileIcon from '@material-ui/icons/PhoneAndroid';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import StarIcon from '@material-ui/icons/Star';

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../loaders/LPLoader";
import {FeatChip, PWA_LOGO, REACT_LOGO, REDUX_LOGO} from "./LandingPageDesktop";

const SignUpForm = Loadable({
  loader: ()=>import('../forms/SignupForm/SignUpForm'),
  loading: LPLoader,
});

const featureList = [
  'Create polls with texts',
  'Manage profile easily',
  'Get poll updates in real-time',
  'Create polls with images & videos (coming soon)',
];

const styles = theme => ({
  appInfoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    position: 'absolute',
    bottom: '10vh',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100vw',
  },
  appBigTitle: {
    color: '#fbfbfb',
  },
  appSubtitle: {
    color: '#fbfbfb',
  },
  joinButton: {
    color: '#fbfbfb',
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
    color: '#fff',
    textTransform: 'uppercase',
  },
  featchip: {
    backgroundColor: 'transparent',
    marginTop: '10px',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  featList: {
    marginTop: '5vh',
  }
});

const LandingPageMobile = (props) => {
  const {classes} = props;
  return (
    <div className={'tac'}>
      <List className={classes.featList}>
        <ListItem button >
          <Typography variant={'h5'} className={classes.featText}>Features</Typography>
        </ListItem>
        {
          featureList.map(feat => (
            <ListItem button key={feat} >
              <ListItemIcon className={classes.starIcon}><StarIcon/></ListItemIcon>
              <ListItemText inset primary={feat} primaryTypographyProps={{
                className: classes.featText,
                variant: 'body2'
              }} />
            </ListItem>
          ))
        }
      </List>
      <div className={classes.appInfoCard}>
        <Typography
          variant="h3"
          className={classes.appBigTitle}
          gutterBottom>Livepoll
        </Typography>
        <Typography
          variant="body1"
          className={classes.appSubtitle}
          gutterBottom>
          Create and manage polls online. Have fun!
        </Typography>
        <br/>
        <ModalOpenerButton
          className={classes.joinButton}
          OpenerIcon={JoinMobileIcon}
          ModalComponent={SignUpForm}>
          Join Us
        </ModalOpenerButton>
      </div>
      <div className={classes.footer}>
        <div className={classes.footerInner}>
          <FeatChip className={classes.featchip} avatarSrc={REACT_LOGO} label={'React'}/>
          <FeatChip className={classes.featchip} avatarSrc={REDUX_LOGO} label={'Redux at Worker'}/>
          <FeatChip className={classes.featchip} avatarSrc={PWA_LOGO} label={'PWA'}/>
        </div>
      </div>
    </div>
  )
};
export default withStyles(styles)(LandingPageMobile);