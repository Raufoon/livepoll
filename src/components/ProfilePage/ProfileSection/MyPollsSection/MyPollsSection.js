import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import TextPollCard from "../../../poll-cards/TextPollCard";
import {actionFetchMyPolls} from "../../../../state-management/actions/my-profile-actions";

const pollStyle = {
  margin: 10
};

class MyPollsSection extends React.Component {
  componentDidMount() {
    this.props.dispatch(actionFetchMyPolls());
  }
  render() {
    if (!this.props.polls) return 'loading...';
    return (
      <React.Fragment>
        {
          this.props.polls.map(poll => (
            <TextPollCard style={pollStyle} key={poll.id} poll={poll}/>
          ))
        }
      </React.Fragment>
    )
  }
}

MyPollsSection.propTypes = {
  polls: PropTypes.array
};

const s2p = state => ({
  polls: state.homePage.trendingPolls
});
export default connect(s2p)(MyPollsSection)