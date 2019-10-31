import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles/index';

import styles from './styles'
import {actionFetchHome} from "../../services/state-management/actions/home-actions";
import Responsive, {
  LARGE_SCREEN,
  MEDIUM_AND_LARGE_SCREEN,
  MEDIUM_SCREEN,
  PHONE_SCREEN
} from "../../components/Responsive";
import PollCard from "../../components/PollCard";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchHome());
  }

  render() {
    const {trendingPolls, popularPolls, classes} = this.props;

    const trendingPollListView = trendingPolls.map(
      ({id, settings, items}) =>
        <PollCard
          key={id}
          className={classes.trendingPollCard}
          title={settings.title}
          type={settings.type}
          topItems={items}
          id={id}/>
    );
    const popularPollListView = popularPolls.map(
      ({id, settings, items}) =>
        <PollCard
          key={id}
          className={classes.trendingPollCard}
          title={settings.title}
          type={settings.type}
          topItems={items}
          id={id}/>
    );

    return (
      <div className={'pure-g'}>
        <Responsive screen={PHONE_SCREEN}>
          <div className={'pure-u-1-1 tac'}>TRENDING</div>
          <div className={'pure-u-1-1'}>&nbsp;</div>
          <div className={'pure-u-1-1'}>
            {trendingPollListView}
          </div>
        </Responsive>

        <Responsive screen={MEDIUM_AND_LARGE_SCREEN}>
          <div className={'pure-u-8-24'}>
            <label className={classes.homeSectionTitle}>RECENT</label>
            <br/>
            {trendingPollListView}
          </div>

          <Responsive screen={MEDIUM_AND_LARGE_SCREEN}>
            <div className={'pure-u-8-24'}>
              <label className={classes.homeSectionTitle}>TRENDING</label>
              {trendingPollListView}
            </div>
            <div className={'pure-u-8-24'}>
              <label className={classes.homeSectionTitle}>MOST POPULAR</label>
              {popularPollListView}
            </div>
          </Responsive>
        </Responsive>
      </div>
    )
  }
}

const s2p = state => ({
  trendingPolls: state.homePage.trendingPolls,
  popularPolls: state.homePage.popularPolls,
});

HomePage.propTypes = {
  trendingPolls: PropTypes.array,
  popularPolls: PropTypes.array,
};

export default connect(s2p)( withStyles(() => styles)(HomePage))