import React from "react";
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PollListSection from "../utils/PollListSection/PollListSection";
import {actionFetchMyPolls} from "../../state-management/actions/my-profile-actions";
import Grid from "@material-ui/core/Grid/Grid";
import MediaQuery from "react-responsive";

const style = theme => ({
  textPollCard: {
    border: 'none',
    borderBottom: '1px solid lightgray',
  }
});

const TrendingPollList = (props) => {
  return (
    <React.Fragment>
      <MediaQuery minWidth={800}>
        <Grid container alignItems="flex-start" spacing={16}>
          <Grid item xs={8}>
            <PollListSection
              pollCardClassName={props.classes.textPollCard}
              fetchPollFunc={() => props.dispatch(actionFetchMyPolls())}
              polls={props.polls}/>
          </Grid>
        </Grid>
      </MediaQuery>
      <MediaQuery maxWidth={799}>
        <Grid container alignItems="flex-start" spacing={16}>
          <Grid item xs={12}>
            <PollListSection
              pollCardClassName={props.classes.textPollCard}
              fetchPollFunc={() => props.dispatch(actionFetchMyPolls())}
              polls={props.polls}/>
          </Grid>
        </Grid>
      </MediaQuery>
    </React.Fragment>
  )
};

const s2p = state => ({
  polls: state.homePage.trendingPolls
});
export default connect(s2p)(
  withStyles(style)(TrendingPollList)
);