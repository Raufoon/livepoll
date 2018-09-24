import React from "react";

import './LivepollItemCard.css'

const LivepollitemCard = props => (
  <div className='livepoll-item-card'>
    <br/><label>{props.item.content.text}</label><br/><br/>
  </div>
);

export default LivepollitemCard