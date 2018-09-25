import React from "react";
import {requestGiveVote} from "../../../util/cloud/livepoll";

const LivepollItemList = props => {
  return (
    <React.Fragment>
      {
        Object.values(props.items || {}).map(item => (
          <div key={item.id}>
            <br/>
            <b>{item.content.text}</b><br/>
            <span>{item.voteCount} votes</span><br/>
            {props.showVoteButton && <button onClick={() => {requestGiveVote(props.pollId, item.id)}}>vote</button>}
            <br/>
            <br/>
          </div>
        ))
      }
    </React.Fragment>
  )
};

export default LivepollItemList