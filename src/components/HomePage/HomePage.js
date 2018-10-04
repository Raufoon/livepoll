import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive';

import {actionFetchHome} from "../../state-management/actions/home-actions";
import TrendingPollsSlider from "./TrendingPollsSlider/TrendingPollsSlider";
import MostPopularPollsCard from "./MostPopularPollsCard/MostPopularPollsCard";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchHome());
  }

  render() {
    return (
      <React.Fragment>
        <MediaQuery orientation="landscape">
          <Grid container alignItems="flex-start" spacing={16}>
            <Grid item xs={8}>
              <TrendingPollsSlider columnWidth={1} polls={this.props.trendingPolls}/>
            </Grid>
            <Grid item xs={4}>
              <MostPopularPollsCard polls={this.props.popularPolls}/>
            </Grid>
          </Grid>
        </MediaQuery>

        <MediaQuery orientation="portrait">
          <Grid container alignItems="flex-start" spacing={16}>
            <Grid item xs={12}>
              <TrendingPollsSlider columnWidth={2} polls={this.props.trendingPolls}/>
            </Grid>
          </Grid>
        </MediaQuery>
      </React.Fragment>
    )
  }
}

const s2p = state => ({
  trendingPolls: state.homePage.trendingPolls,
  popularPolls: state.homePage.popularPolls,
});

HomePage.propTypes = {
  trendingPolls: PropTypes.array,
  popularPolls: PropTypes.array,
};

export default connect(s2p)(HomePage)