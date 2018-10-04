import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';

import {actionFetchHome} from "../../state-management/actions/home-actions";
import TrendingPollsSlider from "./TrendingPollsSlider/TrendingPollsSlider";
import MostPopularPollsCard from "./MostPopularPollsCard/MostPopularPollsCard";

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
            <MostPopularPollsCard polls={Object.values(this.props.popularPolls)}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const s2p = state => ({
  trendingPolls: state.homePage.trendingPolls,
  popularPolls: state.homePage.popularPolls,
});

HomePage.propTypes = {
  trendingPolls: PropTypes.object,
  popukarPolls: PropTypes.object,
};

export default connect(s2p)(HomePage)