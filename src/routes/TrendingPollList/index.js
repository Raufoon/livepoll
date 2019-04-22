import React from "react";
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';

import PollListSection from "../../components/PollListSection/PollListSection";
import Grid from "@material-ui/core/Grid/Grid";
import MediaQuery from "react-responsive";
import {actionFetchTrendingPolls} from "../../services/state-management/actions/home-actions";
import Responsive, {LARGE_SCREEN, MEDIUM_SCREEN, PHONE_SCREEN} from "../../components/Responsive";
import PollCard from "../../components/PollCard";
import TextPollCard from "../../components/poll-cards/TextPollCard";
import BigRemoteDataDisplay from "../../components/BigRemoteDataDisplay/BigRemoteDataDisplay";

const style = theme => ({
  pollCard: {
    margin: 10,
    padding: 10
  }
});

const TrendingPollList = (props) => {
  const {classes, trendingPolls} = props;

  const createTrendingPollListView = (className, cardClassName) => trendingPolls.map(
    ({id, settings, items}) =>
      <div key={id} className={className}>
        <PollCard
          className={cardClassName}
          title={settings.title}
          type={settings.type}
          topItems={items}
          id={id}/>
      </div>
  );

  return (
    <div className={'pure-g'}>
      <BigRemoteDataDisplay
        doRequest={() => props.dispatch(actionFetchTrendingPolls(0, 10))}
        limit={10}
        totalFetched={0}
      >
        <Responsive screen={PHONE_SCREEN}>
          { createTrendingPollListView('pure-u-1-1', classes.pollCard) }
        </Responsive>
        <Responsive screen={MEDIUM_SCREEN}>
          { createTrendingPollListView(`pure-u-12-24`, classes.pollCard) }
        </Responsive>
        <Responsive screen={LARGE_SCREEN}>
          { createTrendingPollListView('pure-u-8-24', classes.pollCard) }
        </Responsive>
      </BigRemoteDataDisplay>
    </div>
  )
};

const s2p = state => ({
  trendingPolls: state.homePage.trendingPolls
});

export default connect(s2p)(
  withStyles(style)(TrendingPollList)
);