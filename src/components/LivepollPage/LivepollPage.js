import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {actionFetchPollInfo, actionRequestFirstNItems} from "../../state-management/actions/livepoll-actions";
import LivepollInfoCard from "./LivepollInfoCard/LivepollInfoCard";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
import BigRemoteDataDisplay from "../BigRemoteDataDisplay/BigRemoteDataDisplay";

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
      <BigRemoteDataDisplay
        childComponent={LivepollItemList}
        getStateData={
          () => props.livepoll.items || {}
        }
        requestData={
          (limit, startItemId) =>
            props.dispatch(actionRequestFirstNItems(props.livepoll.id, limit, startItemId))
        }
        getChildProps={
          () => ({
            items: props.livepoll.items,
            pollId: props.livepoll.id,
            showVoteButton: true
          })
        }
        limit={50}/>
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