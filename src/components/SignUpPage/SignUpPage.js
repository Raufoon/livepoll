import React from 'react';
import MediaQuery from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';

import LandingPageDesktop from "./LandingPageDesktop";
import LandingPageMobile from "./LandingPageMobile";

const styles = theme => ({
  container: {
    backgroundImage: 'linear-gradient(to bottom right, #00493f, #fbfbfb)',
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