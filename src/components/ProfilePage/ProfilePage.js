import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import MediaQuery from 'react-responsive';

import ProfileCard from "./ProfileCard/ProfileCard";
import ProfileSection from "./ProfileSection/ProfileSection";

const ProfilePage = props => {
  return (
    <React.Fragment>
      <MediaQuery orientation={'portrait'}>
        <Grid container alignItems="flex-start" spacing={16}>
          <Grid item xs={12}>
            <ProfileCard/>
          </Grid>
          <Grid item xs={12}>
            <ProfileSection/>
          </Grid>
        </Grid>
      </MediaQuery>

      <MediaQuery orientation={'landscape'}>
        <Grid container alignItems="flex-start" spacing={16}>
          <Grid item xs={3}>
            <ProfileCard/>
          </Grid>
          <Grid item xs={9}>
            <ProfileSection/>
          </Grid>
        </Grid>
      </MediaQuery>
    </React.Fragment>
  );
};

export default ProfilePage