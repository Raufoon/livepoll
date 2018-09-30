import React from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import {actionFetchHome} from "../../state-management/actions/home-actions";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchHome());
  }

  render() {
    return (
      <div>
        <Grid container alignItems="flex-start" spacing={16}>
          <Grid item xs={8}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>xs=3</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default connect()(HomePage)