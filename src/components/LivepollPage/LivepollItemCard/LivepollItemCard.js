import React from "react";

import './LivepollItemCard.css'

const LivepollitemCard = props => (
  <div className='livepoll-item-card'>
    <br/><span>{props.item.content.text}</span><br/><br/>
  </div>
);

export default LivepollitemCard