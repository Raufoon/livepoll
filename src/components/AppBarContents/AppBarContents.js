import React from "react";
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
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

import {actionSignoutRequest} from "../../state-management/actions/auth-actions";

const styles = {
  flexGrow10: {flexGrow: 1},
  flexGrow3: {flexGrow: .3},
  flexGrow7: {flexGrow: .7},
};

const AppBarContents = props => {
  const doSignOut = () => props.dispatch(actionSignoutRequest());
  return (
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu"><MenuIcon /></IconButton>
      <Typography variant="title" color="inherit">
        <Link className={'app-title'} to={'/'}>Livepoll</Link>
      </Typography>

      <div style={styles.flexGrow3}/>
      <MediaQuery orientation="landscape">
        <Button component={NavLink} to={'/trending'}>
          <TrendingIcon/>&nbsp;&nbsp;Trending
        </Button>
        <Button component={NavLink} to={'/popular'}>
          <PopularIcon/>&nbsp;&nbsp;Popular
        </Button>
        <Button component={NavLink} to={'/recent'}>
          <RecentIcon/>&nbsp;&nbsp;Recent
        </Button>
      </MediaQuery>
      <div style={styles.flexGrow7}/>

      <AuthUserBadge/>
      <MediaQuery orientation="landscape">
        &nbsp;&nbsp;
        <Button size="small" color="secondary" onClick={doSignOut}>
          <SignoutIcon/>&nbsp;&nbsp;Sign out
        </Button>
      </MediaQuery>
    </Toolbar>
  )
};

export default connect()(AppBarContents)