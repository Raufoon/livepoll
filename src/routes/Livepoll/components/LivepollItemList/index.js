import React from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import PollSettings from "../../../../services/util/poll/poll-definitions/poll-settings";
import TextItem from "./components/TextItem";
import {actionGiveVote, actionRequestTopItems} from "../../../../services/state-management/actions/livepoll-actions";
import BigRemoteDataDisplay from "../../../../components/BigRemoteDataDisplay/BigRemoteDataDisplay";

const LivepollItemList = props => {
  let ItemComponent;

  switch (props.livepoll.settings.itemFormat) {
    case PollSettings.POLL_ITEM_FORMAT.TEXT:
      ItemComponent = TextItem;
      break;

    default:
  }

  let percentData = {};
  if (props.isPercentView) {
    percentData = {
      isPercentView: true,
      totalVotes: props.livepoll.totalVotes
    }
  }

  return (
    <BigRemoteDataDisplay
      doRequest={(startAt, limit) =>
        props.dispatch(actionRequestTopItems(props.livepoll.id, startAt, limit))
      }
      totalFetched={Object.keys(props.livepoll.items || {}).length}
      limit={50}>
      <FlipMove>
        {
          props.items
            .map((item, index) =>
              <ItemComponent
                key={item.id}
                {...percentData}
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
      </FlipMove>
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