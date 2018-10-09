import React from "react";
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography/Typography";
import {Link} from "react-router-dom";
import MediaQuery from "react-responsive";
import Button from "@material-ui/core/Button/Button";
import AuthUserBadge from "../AuthUserBadge/AuthUserBadge";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import SignoutIcon from '@material-ui/icons/ExitToAppSharp';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import PopularIcon from '@material-ui/icons/FavoriteBorder';
import RecentIcon from '@material-ui/icons/Sort';
import { withStyles } from '@material-ui/core/styles';

import {actionSignoutRequest} from "../../state-management/actions/auth-actions";

const styles = {
  flexGrow10: {flexGrow: 1},
  flexGrow3: {flexGrow: .3},
  flexGrow7: {flexGrow: .7},
  signOutBtn: {
    color: '#4a4e69'
  },
  activeLink: {
    color: 'crimson !important'
  },
  navlink: {
    color: '#4a4e69'
  }
};

const AppBarContents = props => {
  const doSignOut = () => props.dispatch(actionSignoutRequest());
  const {classes} = props;
  return (
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu"><MenuIcon /></IconButton>
      <Typography variant="h6" color="inherit">
        <Link className={'app-title'} to={'/'}>Livepoll</Link>
      </Typography>

      <div className={classes.flexGrow3}/>
      <MediaQuery minWidth={800}>
        <Button
          className={classes.navlink}
          activeClassName={classes.activeLink}
          component={NavLink}
          to={'/trending'}>
          <TrendingIcon/>&nbsp;&nbsp;Trending
        </Button>
        <Button
          className={classes.navlink}
          activeClassName={classes.activeLink}
          component={NavLink}
          to={'/popular'}>
          <PopularIcon/>&nbsp;&nbsp;Popular
        </Button>
        <Button
          className={classes.navlink}
          activeClassName={classes.activeLink}
          component={NavLink}
          to={'/recent'}>
          <RecentIcon/>&nbsp;&nbsp;Recent
        </Button>
      </MediaQuery>
      <div className={classes.flexGrow7}/>

      <AuthUserBadge/>
      <MediaQuery minWidth={800}>
        &nbsp;&nbsp;
        <Button size="small" onClick={doSignOut} className={classes.signOutBtn}>
          <SignoutIcon/>&nbsp;&nbsp;Sign out
        </Button>
      </MediaQuery>
    </Toolbar>
  )
};

export default withRouter(
  connect()(
    withStyles(styles)(AppBarContents)
  )
)