import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive';

import {actionFetchHome} from "../../state-management/actions/home-actions";
import TrendingPollsSlider from "../utils/PollGridCard/PollGridCard";
import MostPopularPollsCard from "../utils/PollListCard/PollListCard";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchHome());
  }

  render() {
    return (
      <React.Fragment>
        <MediaQuery minWidth={800}>
          <Grid container alignItems="flex-start" spacing={16}>
            <Grid item xs={8}>
              <TrendingPollsSlider title={'Trending Now'} moreLink={'/trending'} columnWidth={1} polls={this.props.trendingPolls}/>
            </Grid>
            <Grid item xs={4}>
              <MostPopularPollsCard title={'Most Popular'} moreLink={'/popular'} polls={this.props.popularPolls}/>
            </Grid>
          </Grid>
        </MediaQuery>

        <MediaQuery maxWidth={799}>
          <Grid container alignItems="flex-start" spacing={16}>
            <Grid item xs={12}>
              <MostPopularPollsCard title={'Trending Now'} moreLink={'/trending'} polls={this.props.trendingPolls}/>
            </Grid>
            <Grid item xs={12}>
              <MostPopularPollsCard title={'Most Popular'} moreLink={'/popular'} polls={this.props.trendingPolls}/>
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