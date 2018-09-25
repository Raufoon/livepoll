import React from "react";

import './LivepollItemCard.css'

const LivepollitemCard = props => (
  <div className='livepoll-item-card'>
    <br/>
    <b>{props.item.content.text}</b><br/>
    <span>{props.item.voteCount} votes</span>
    <br/>
  </div>
);

export default LivepollitemCard