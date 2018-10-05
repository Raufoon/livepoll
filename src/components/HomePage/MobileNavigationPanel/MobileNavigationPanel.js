import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import PopularIcon from '@material-ui/icons/Favorite';
import RecentIcon from '@material-ui/icons/Sort';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 10,
    marginBotton: 0,
    maxWidth: 500,
  },
};

class MobileNavigationPanel extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper square className={classes.root} elevation={1}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<HomeIcon />} label="Home" />
          <Tab icon={<TrendingIcon />} label="Trending" />
          <Tab icon={<PopularIcon />} label="Popular" />
          <Tab icon={<RecentIcon />} label="Recent" />
        </Tabs>
      </Paper>
    );
  }
}

export default withStyles(styles)(MobileNavigationPanel);
