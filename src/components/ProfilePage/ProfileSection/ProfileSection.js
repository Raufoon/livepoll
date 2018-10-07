import React from 'react';
import {Switch, Route} from 'react-router-dom'

import ProfileSectionNavigator from "./ProfileSectionNavigator/ProfileSectionNavigator";
import MyPollsSection from "./MyPollsSection/MyPollsSection";
import PollsIVotedSection from "./PollsIVotedSection/PollsIVotedSection";

const ProfileSection = () => {
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

export default ProfileSection;