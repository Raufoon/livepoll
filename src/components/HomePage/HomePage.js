import React from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {actionFetchHome} from "../../state-management/actions/home-actions";
import TrendingPollsSlider from "./TrendingPolls/TrendingPollsSlider";
import Typography from "@material-ui/core/Typography/Typography";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchHome());
  }

  render() {
    return (
      <div>
        <Grid container alignItems="flex-start" spacing={16}>
          <Grid item xs={8}>
            <TrendingPollsSlider polls={Object.values(this.props.trendingPolls)}/>
          </Grid>
          <Grid item xs={4}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={8}>
            <Typography gutterBottom variant="display1">Recent</Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
}
const s2p = state => ({
  trendingPolls: state.homePage.trendingPolls
});
export default connect(s2p)(HomePage)