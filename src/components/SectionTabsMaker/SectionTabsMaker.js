import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar/index';
import { withStyles } from '@material-ui/core/styles/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class SectionTabsMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
    };
  }

  componentDidMount() {
    this.setSection();
  }

  setSection() {
    for (let i = 0; i < this.props.tabRoutes.length; i++) {
      if (this.props.location.pathname === this.props.tabRoutes[i]) {
        this.setState({
          value: i
        });
        return;
      }
    }
    this.setState({
      value: -1
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.location.pathname !== this.props.location.pathname) {
      this.setSection();
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(this.props.tabRoutes[value]);
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.root} style={this.props.style} position="sticky" color={'default'}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          {
            this.props.tabRoutes.map((route, index) => {
              let Icon, label;
              if (this.props.tabIcons) Icon = this.props.tabIcons[index];
              if (this.props.tabLabels) label = this.props.tabLabels[index];
              if (Icon && label) {
                return <Tab key={route} icon={<Icon/>} label={label}/>;
              } else if (Icon) {
                return <Tab key={route} icon={<Icon/>}/>;
              } else {
                return <Tab key={route} label={label}/>;
              }
            })
          }
        </Tabs>
      </AppBar>
    );
  }
}

SectionTabsMaker.propTypes = {
  tabIcons: PropTypes.array,
  tabLabels: PropTypes.array,
  style: PropTypes.object,
  tabRoutes: PropTypes.array.isRequired,
};

export default withStyles(styles)(
  withRouter(SectionTabsMaker)
);
