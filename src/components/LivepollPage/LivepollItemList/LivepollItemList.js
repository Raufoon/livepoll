import React from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import TextItem from "./item-components/TextPollItem";
import {actionGiveVote, actionRequestTopItems} from "../../../state-management/actions/livepoll-actions";
import BigRemoteDataDisplay from "../../utils/BigRemoteDataDisplay/BigRemoteDataDisplay";

const LivepollItemList = props => {
  let ItemComponent;

  switch (props.livepoll.settings.itemFormat) {
    case PollSettings.POLL_ITEM_FORMAT.TEXT:
      ItemComponent = TextItem;
      break;

    default:
  }

  return (
    <BigRemoteDataDisplay
      doRequest={(startAt, limit) =>
        props.dispatch(actionRequestTopItems(props.livepoll.id, startAt, limit))
      }
      totalFetched={Object.keys(props.livepoll.items || {}).length}
      limit={50}>
      {
        props.items
          .map((item, index) =>
            <ItemComponent
              key={item.id}
              index={index + 1}
              isFirst={item.voteCount !== 0 && item.voteCount === props.items[0].voteCount}
              item={item}
              pollId={props.livepoll.id}
              showVoters={props.livepoll.settings.showVoters}
              isAlreadyVoted={props.lastVotedItemId === item.id}
              voteDisabled={props.voteDisabled}
              hideVotes={props.willStartOnFuture}
              vote={()=> props.dispatch(actionGiveVote(props.livepoll.id, item.id, props.lastVotedItemId))}/>
          )
      }
    </BigRemoteDataDisplay>
  );
};

LivepollItemList.propTypes = {
  items: PropTypes.array.isRequired,
  livepoll: PropTypes.object,
  lastVotedItemId: PropTypes.string,
  willStartOnFuture: PropTypes.bool,
  voteDisabled: PropTypes.bool,
};

export default connect()(LivepollItemList)