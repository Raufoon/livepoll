import React from "react";
const LivepollItemList = props => {
  return (
    <React.Fragment>
      {
        Object.values(props.items || {}).map(item => (
          <div key={item.id}>
            <br/>
            <b>{item.content.text}</b><br/>
            <span>{item.voteCount} votes</span><br/>
            <button onClick={() => {props.vote(item.id)}}>vote</button>
            <br/>
            <br/>
          </div>
        ))
      }
    </React.Fragment>
  )
};

export default LivepollItemList