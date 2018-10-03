import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import ProfileCard from "./ProfileCard/ProfileCard";

const ProfilePage = props => {
  return (
    <Grid container alignItems="flex-start" spacing={16}>
      <Grid item xs={3}>
        <ProfileCard/>
      </Grid>
      <Grid item xs={5}>

      </Grid>
      <Grid item xs={4}>

      </Grid>
    </Grid>
  )
};

export default ProfilePage