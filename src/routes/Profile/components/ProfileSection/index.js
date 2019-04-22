import React from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles/index';

import ProfileSectionNavigator from "./ProfileSectionNavigator/ProfileSectionNavigator";
import {actionFetchMyPolls} from "../../../../services/state-management/actions/my-profile-actions";
import BigRemoteDataDisplay from "../../../../components/BigRemoteDataDisplay/BigRemoteDataDisplay";
import PollCard from "../../../../components/PollCard";

const style = theme => ({
  textPollCard: {
    border: '1px solid lightgray',
  }
});

const PollsCollection = ({polls, fetchFunc, className}) => {
  return (
    <BigRemoteDataDisplay
      doRequest={fetchFunc}
      limit={10}
      totalFetched={0}
    >
      {
        polls.map(
          ({id, settings, items}) =>
            <div key={id} className={className}>
              <PollCard
                className={'mg10 pad10'}
                title={settings.title}
                type={settings.type}
                topItems={items}
                id={id}/>
            </div>
        )
      }
    </BigRemoteDataDisplay>
  )
};

const Index = (props) => {
  const MyPollsSection = () =>
    <PollsCollection
      className={'pure-u-1-1'}
      fetchFunc={(startAt, howMany) => props.dispatch(actionFetchMyPolls(startAt, howMany))}
      polls={props.polls}
    />;

  const PollsIVotedSection = () =>
    <PollsCollection
      className={'pure-u-1-1'}
      fetchFunc={(startAt, howMany) => props.dispatch(actionFetchMyPolls(startAt, howMany))}
      polls={props.polls}
    />;

  return (
    <div className={'pure-g'}>
      <div className={'pure-u-1-1'}>
        <ProfileSectionNavigator/>
      </div>
      <Switch>
        <Route exact path={'/me/pollsivoted'} component={PollsIVotedSection}/>
        <Route component={MyPollsSection}/>
      </Switch>
    </div>
  )
};

const s2p = state => ({
  polls: state.myProfile.myPolls
});

export default connect(s2p)(
  withStyles(style)(Index)
);