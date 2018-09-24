import React from 'react'
import {connect} from 'react-redux'

import BigRemoteDataDisplay from "../../BigRemoteDataDisplay/BigRemoteDataDisplay";
import {actionRequestFirstNItems} from "../../../state-management/actions/livepoll-actions";
import LivepollItemList from "../LivepollItemList/LivepollItemList";

const LivepollItemsLoader = props => {
  const getStateData = () => props.livepoll.items || {};

  const requestData = (limit, startItemId) =>
    props.dispatch(actionRequestFirstNItems(props.livepoll.id, limit, startItemId));

  const getChildProps = () => ({
    items: props.livepoll.items,
    pollId: props.livepoll.id
  });

  return (
    <BigRemoteDataDisplay
      childComponent={LivepollItemList}
      getStateData={getStateData}
      requestData={requestData}
      getChildProps={getChildProps}
      limit={50}/>
  )
};

export default connect()(LivepollItemsLoader)