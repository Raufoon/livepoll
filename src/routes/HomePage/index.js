import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid/index';
import MediaQuery from 'react-responsive';

import {actionFetchHome} from "../../services/state-management/actions/home-actions";
import PollGridCard from "../../components/PollGridCard/PollGridCard";
import PollListCard from "../../components/PollListCard/PollListCard";
import Responsive, {LARGE_SCREEN, MEDIUM_AND_LARGE_SCREEN, MEDIUM_SCREEN} from "../../components/Responsive";
import PollCard from "../../components/PollCard";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchHome());
  }

  render() {
    const {
      trendingPolls, popularPolls
    } = this.props;

    return (
      <div className={'pure-g'}>
        <Responsive screen={MEDIUM_AND_LARGE_SCREEN}>
          <div className={'pure-u-12-24'}>
            Recent
          </div>

          <Responsive screen={MEDIUM_SCREEN}>
            <div className={'pure-u-2-24'}/>
            <div className={'pure-u-10-24'}>
              <h2>Trending</h2>
              {
                trendingPolls.map(
                  ({id, settings, items}) =>
                    <PollCard key={id} title={settings.title} type={settings.type} topItems={items} id={id}/>
                )
              }
            </div>
          </Responsive>

          <Responsive screen={LARGE_SCREEN}>
            <div className={'pure-u-6-24'}>
              Trending
            </div>
            <div className={'pure-u-6-24'}>
              Most Popular
            </div>
          </Responsive>
        </Responsive>
        {/*<MediaQuery minWidth={800}>*/}
        {/*  <Grid container alignItems="flex-start" spacing={16}>*/}
        {/*    <Grid item xs={8}>*/}
        {/*      <PollGridCard title={'Trending Now'} moreLink={'/trending'} columnWidth={1} polls={this.props.trendingPolls}/>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={4}>*/}
        {/*      <PollListCard title={'Most Popular'} moreLink={'/popular'} polls={this.props.popularPolls}/>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</MediaQuery>*/}

        {/*<MediaQuery maxWidth={799}>*/}
        {/*  <Grid container alignItems="flex-start" spacing={16}>*/}
        {/*    <Grid item xs={12}>*/}
        {/*      <PollListCard title={'Trending Now'} moreLink={'/trending'} polls={this.props.trendingPolls}/>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12}>*/}
        {/*      <PollListCard title={'Most Popular'} moreLink={'/popular'} polls={this.props.popularPolls}/>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</MediaQuery>*/}
      </div>
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