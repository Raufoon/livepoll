import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {actionFetchPollInfo} from "../../state-management/actions/livepoll-actions";

const LivepollPage = props => {
  const pid = props.match.params.id;
  props.dispatch(actionFetchPollInfo(pid));
  return (
    <div>
      {
        pid
      }
    </div>
  )
};

export default withRouter(connect()(LivepollPage))