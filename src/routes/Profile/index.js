import React from 'react'

import ProfileCard from "./components/ProfileCard";
import ProfileSection from "./components/ProfileSection";
import Responsive, {
  MEDIUM_AND_LARGE_SCREEN,
  PHONE_SCREEN
} from "../../components/Responsive";

const Index = props => {
  return (
    <div className={'pure-g'}>
      <Responsive screen={PHONE_SCREEN}>
        <div className={'pure-u-1-1'}>
          <ProfileCard/>
        </div>
        <div className={'pure-u-1-1'}>
          <ProfileSection/>
        </div>
      </Responsive>
      <Responsive screen={MEDIUM_AND_LARGE_SCREEN}>
        <div className={'pure-u-8-24'}>
          <ProfileCard/>
        </div>
        <div className={'pure-u-16-24'}>
          <ProfileSection/>
        </div>
      </Responsive>
    </div>
  );
};

export default Index