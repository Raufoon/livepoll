import React from 'react';

import SectionTabsMaker from "../../../../components/SectionTabsMaker/SectionTabsMaker";

const style = {
  border: 'none',
  boxShadow: 'none',
};
const tabRoutes = [
  '/me', '/me/pollsivoted'
];
const tabLabels = [
  'My Polls', 'Polls I voted'
];

const ProfileSectionNavigator = () => {
  return (
    <SectionTabsMaker
      style={style}
      tabRoutes={tabRoutes}
      tabLabels={tabLabels}
    />
  )
};

export default ProfileSectionNavigator;