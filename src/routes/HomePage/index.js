import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles/index';

import styles from './styles'
import {actionFetchHome} from "../../services/state-management/actions/home-actions";
import Responsive, {LARGE_SCREEN, MEDIUM_AND_LARGE_SCREEN, MEDIUM_SCREEN} from "../../components/Responsive";
import PollCard from "../../components/PollCard";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchHome());
  }

  render() {
    const {trendingPolls, popularPolls, classes} = this.props;

    return (
      <div className={'pure-g'}>
        <Responsive screen={MEDIUM_AND_LARGE_SCREEN}>
          <div className={'pure-u-12-24'}>
            Recent
          </div>

          <Responsive screen={MEDIUM_SCREEN}>
            <div className={'pure-u-2-24'}/>
            <div className={'pure-u-10-24'}>
              <label>TRENDING</label>
              {
                trendingPolls.map(
                  ({id, settings, items}) =>
                    <PollCard
                      key={id}
                      className={classes.trendingPollCard}
                      title={settings.title}
                      type={settings.type}
                      topItems={items}
                      id={id}/>
                )
              }
            </div>
          </Responsive>

          <Responsive screen={LARGE_SCREEN}>
            <div className={'pure-u-6-24'}>
              Trending
            </div>
            <div className={'pure-u-6-24'}>
              Most Popular
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