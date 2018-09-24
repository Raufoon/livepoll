import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {actionFetchPollInfo} from "../../state-management/actions/livepoll-actions";
import LivepollInfoCard from "./LivepollInfoCard/LivepollInfoCard";
import LivepollItemsLoader from "./LivepollItemsLoader/LivepollItemsLoader";

const LivepollPage = props => {
  const pid = props.match.params.id;

  if (!props.livepoll) {
    props.dispatch(actionFetchPollInfo(pid));
    return "loading..."
  }

  return (
    <div>
      <LivepollInfoCard livepoll={props.livepoll} />
      <br/><br/>
      <LivepollItemsLoader livepoll={props.livepoll}/>
    </div>
  )
};

const s2p = (state, ownProps) => ({
  livepoll: state.polls[ownProps.match.params.id]
});

LivepollPage.propTypes = {
  livepoll: PropTypes.object,
};

export default connect(s2p)(withRouter(LivepollPage))