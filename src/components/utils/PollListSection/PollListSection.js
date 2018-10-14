import React from 'react'
import PropTypes from 'prop-types';

import BigRemoteDataDisplay from "../BigRemoteDataDisplay/BigRemoteDataDisplay";
import TextPollCard from "../../poll-cards/TextPollCard";

const PollListSection = props => (
  <BigRemoteDataDisplay
    doRequest={props.fetchPollFunc}
    limit={10}
    totalFetched={0}>
    {
      props.polls.map(poll => (
        <TextPollCard key={poll.id} poll={poll} className={props.pollCardClassName}/>
      ))
    }
  </BigRemoteDataDisplay>
);

PollListSection.propTypes = {
  fetchPollFunc: PropTypes.func.isRequired,
  polls: PropTypes.array,
  pollCardClassName: PropTypes.string
};

export default PollListSection