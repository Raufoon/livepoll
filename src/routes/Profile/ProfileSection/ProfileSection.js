import React from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles/index';

import ProfileSectionNavigator from "./ProfileSectionNavigator/ProfileSectionNavigator";
import PollListSection from "../../../components/PollListSection/PollListSection";
import {actionFetchMyPolls} from "../../../services/state-management/actions/my-profile-actions";

const style = theme => ({
  textPollCard: {
    border: '1px solid lightgray',
  }
});

const ProfileSection = (props) => {
  const MyPollsSection = () =>
    <PollListSection
      pollCardClassName={props.classes.textPollCard}
      fetchPollFunc={(startAt, howMany) => props.dispatch(actionFetchMyPolls(startAt, howMany))}
      polls={props.polls}/>;

  const PollsIVotedSection = () =>
    <PollListSection
      pollCardClassName={props.classes.textPollCard}
      fetchPollFunc={(startAt, howMany) => props.dispatch(actionFetchMyPolls(startAt, howMany))}
      polls={props.polls}/>;

  return (
    <div>
      <ProfileSectionNavigator/>
      <br/>
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
  withStyles(style)(ProfileSection)
);