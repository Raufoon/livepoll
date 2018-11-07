import React from 'react';
import MediaQuery from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import Loadable from 'react-loadable';

import LPLoader from "../loaders/LPLoader";
import {APP_COLOR_GRADIENT} from "../../constants/livepoll-constants";

const LandingPageDesktop = Loadable({
  loader: ()=>import('./LandingPageDesktop'),
  loading: LPLoader,
});
const LandingPageMobile = Loadable({
  loader: ()=>import('./LandingPageMobile'),
  loading: LPLoader,
});

const styles = theme => ({
  container: {
    backgroundImage: APP_COLOR_GRADIENT,
  }
});

const SignUpPage = (props) => {
  const {classes} = props;
  return (
    <div className={classes.container + ' fl w100 h100'}>
      <MediaQuery minWidth={800}>
        <LandingPageDesktop/>
      </MediaQuery>
      <MediaQuery maxWidth={799}>
        <LandingPageMobile/>
      </MediaQuery>
    </div>
  )
};
export default withStyles(styles)(SignUpPage);