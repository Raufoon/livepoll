import React from "react";
import PropTypes from 'prop-types';

import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import TextItem from "./item-components/TextItem";

const LivepollItemList = props => {
  let ItemComponent;
  switch (props.pollSettings.itemFormat) {
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
              isFirst={item.voteCount !== 0 && item.voteCount === props.items[0].voteCount}
              item={item}
              showVoters={props.pollSettings.showVoters}
              isAlreadyVoted={props.lastVotedItemId === item.id}
              voteDisabled={props.voteDisabled}
              hideVotes={props.willStartOnFuture}
              vote={()=>{props.vote(item.id)}}/>)
      }
    </React.Fragment>
  )
};

LivepollItemList.propTypes = {
  items: PropTypes.array.isRequired,
  pollSettings: PropTypes.object.isRequired,
  lastVotedItemId: PropTypes.string,
  willStartOnFuture: PropTypes.bool,
  voteDisabled: PropTypes.bool,
  vote: PropTypes.func,
};

export default LivepollItemList