import React from "react";

import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import TextItem from "./item-components/TextItem";

const LivepollItemList = props => {
  let ItemComponent;
  switch (props.itemFormat) {
    case PollSettings.POLL_ITEM_FORMAT.TEXT:
      ItemComponent = TextItem;
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      {
        props.items
          .map((item, index) =>
            <ItemComponent
              key={item.id}
              index={index + 1}
              isFirst={item.voteCount === props.items[0].voteCount}
              item={item}
              isAlreadyVoted={props.lastVotedItemId === item.id}
              voteDisabled={props.voteDisabled}
              hideVotes={props.willStartOnFuture}
              vote={()=>{props.vote(item.id)}}/>)
      }
    </React.Fragment>
  )
};

export default LivepollItemList