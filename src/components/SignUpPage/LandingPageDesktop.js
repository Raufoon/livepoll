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

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../loaders/LPLoader";
import Smartphone from "./desktop-landing-page-content/Smartphone";
import Footer from "./desktop-landing-page-content/Footer";

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
    backgroundColor: '#088da5'
  },
  smartphone: {
    position: 'absolute',
    left: '70vw',
    top: '52vh',
    width: '38vh',
    height: '70vh',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '10vh',
    backgroundColor: '#dfe7dd'
  },
  starIcon: {
    color: '#ffff66'
  },
  featText: {
    color: '#fbfbfb',
    textTransform: 'uppercase',
  }
});

const featureList = [
  'Create polls with texts',
  'Manage profile easily',
  'Get poll updates in real-time',
  'Create polls with images & videos (coming soon)',
];

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
      <Footer className={classes.footer}/>
    </React.Fragment>
  )
};
export default withStyles(styles)(LandingPageDesktop);