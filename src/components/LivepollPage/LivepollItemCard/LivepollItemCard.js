import React from "react";

import './LivepollItemCard.css'

const LivepollitemCard = props => (
  <div className='livepoll-item-card'>
    <h3>{props.item.content.text}</h3>
  </div>
);

export default LivepollitemCard