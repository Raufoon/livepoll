import React from 'react';
import {withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
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
    marginBotton: 0,
    maxWidth: 500,
    boxShadow: '0px 2px 2px lightgray',
    border: 'none',
  },
};

class MobileNavigationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    switch (props.location.pathname) {
      case '/':
        this.state.value = 0;
        break;
      case '/trending':
        this.state.value = 1;
        break;
      case '/popular':
        this.state.value = 2;
        break;
      case '/recent':
        this.state.value = 3;
        break;
      default:
    }
  }

  componentDidUpdate(oldProps) {
    let value;
    if (oldProps.location.pathname !== this.props.location.pathname) {
      switch (this.props.location.pathname) {
        case '/':
          value = 0;
          break;
        case '/trending':
          value = 1;
          break;
        case '/popular':
          value = 2;
          break;
        case '/recent':
          value = 3;
          break;
        default:
      }
      this.setState({value});
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    switch (value) {
      case 0:
        this.props.history.push('/');
        break;
      case 1:
        this.props.history.push('/trending');
        break;
      case 2:
        this.props.history.push('/popular');
        break;
      case 3:
        this.props.history.push('/recent');
        break;

      default:
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.root} position="sticky" color={'default'}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<HomeIcon />} label="Home"/>
          <Tab icon={<TrendingIcon />} label="Trending"/>
          <Tab icon={<PopularIcon />} label="Popular" />
          <Tab icon={<RecentIcon />} label="Recent" />
        </Tabs>
      </AppBar>
    );
  }
}

export default withStyles(styles)(
  withRouter(MobileNavigationPanel)
);