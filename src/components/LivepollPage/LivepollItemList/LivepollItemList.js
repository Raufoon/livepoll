import React from "react";
import LivepollitemCard from "../LivepollItemCard/LivepollItemCard";

const LivepollItemList = props => {
  return (
    <React.Fragment>
      {
        Object.values(props.items || {}).map(item => <LivepollitemCard  key={item.id} item={item}/>)
      }
    </React.Fragment>
  )
};

export default LivepollItemList