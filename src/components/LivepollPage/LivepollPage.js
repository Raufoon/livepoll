import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  actionFetchPollInfo,
  actionGiveVote,
  actionRequestTopItems
} from "../../state-management/actions/livepoll-actions";
import LivepollInfoCard from "./LivepollInfoCard/LivepollInfoCard";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
import BigRemoteDataDisplay from "../BigRemoteDataDisplay/BigRemoteDataDisplay";
import {actionRequestCheckAlreadyVotedPoll} from "../../state-management/actions/my-profile-actions";
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import CreateItemForm from "../forms/CreateItemForm/CreateItemForm";

const LivepollPage = props => {
  const pid = props.match.params.id;
  const livepoll = props.livepoll;

  if (!livepoll) {
    props.dispatch(actionFetchPollInfo(pid));
    props.dispatch(actionRequestCheckAlreadyVotedPoll(pid));
    return "loading..."
  }

  const settings = props.livepoll.settings;
  const start = new Date(settings.startDatetime);
  const end = new Date(settings.endDatetime);
  const now = new Date();
  const endTimeExists = !!settings.endDatetime;
  const willStartOnFuture = now < start;
  const hasEnded = endTimeExists && now >= end;
  const isLive = !(willStartOnFuture || hasEnded);
  const canIAdd
    = settings.othersCanAdd || (!settings.othersCanAdd && settings.creatorId === props.authUserId);
  const showAddItemButton = canIAdd && !hasEnded;

  return (
    <div>
      <LivepollInfoCard
        livepoll={props.livepoll}
        isLive={isLive}
        willStartOnFuture={willStartOnFuture}
        hasEnded={hasEnded}
      />

      <br/><br/>

      <BigRemoteDataDisplay
        childComponent={LivepollItemList}
        requestData={(startAt, limit) =>
          props.dispatch(actionRequestTopItems(props.livepoll.id, startAt, limit))
        }
        getChildProps={()=>({
          items: Object.values(props.livepoll.items || {})
            .sort((A, B) => A.voteCount > B.voteCount ? -1 : 1),

          vote: (itemId) => {
            props.dispatch(actionGiveVote(props.livepoll.id, itemId, props.lastVotedItemId))
          },
          pollSettings: props.livepoll.settings,
          lastVotedItemId: props.lastVotedItemId,
          voteDisabled: !isLive,
          willStartOnFuture: willStartOnFuture
        })}
        totalFetched={Object.keys(props.livepoll.items || {}).length}
        limit={50}/>

      <br/>
      {
        showAddItemButton &&
        <ModalOpenerButton
          ModalComponent={CreateItemForm}
          buttonProps={{
            variant: 'contained', size: "small"
          }}
          childProps={{
            pollId: props.livepoll.id,
            format: props.livepoll.settings.itemFormat,
          }}
        >Add an item</ModalOpenerButton>
      }
    </div>
  )
};

const s2p = (state, ownProps) => ({
  livepoll: state.polls[ownProps.match.params.id],
  lastVotedItemId: state.myProfile.votedPolls[ownProps.match.params.id],
  authUserId: state.auth.currentUser.uid,
});

LivepollPage.propTypes = {
  livepoll: PropTypes.object,
  lastVotedItemId: PropTypes.string,
  authUserId: PropTypes.string,
};

export default connect(s2p)(withRouter(LivepollPage))