import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import './LivepollPage.css'
import {actionFetchPollInfo} from "../../state-management/actions/livepoll-actions";
import LivepollInfoCard from "./LivepollInfoCard/LivepollInfoCard";
import LivepollItemList from "./LivepollItemList/LivepollItemList";
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

  const settings = livepoll.settings;
  const start = new Date(settings.startDatetime);
  const end = new Date(settings.endDatetime);
  const now = new Date();
  const endTimeExists = !!settings.endDatetime;
  const willStartOnFuture = now < start;
  const hasEnded = endTimeExists && now >= end;
  const isLive = !(willStartOnFuture || hasEnded);
  const canIAdd = settings.othersCanAdd || (!settings.othersCanAdd && settings.creatorId === props.authUserId);
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

      <LivepollItemList
        items={
          Object.values(props.livepoll.items || {})
            .sort((A, B) => A.voteCount > B.voteCount ? -1 : 1)
        }
        lastVotedItemId={props.lastVotedItemId}
        voteDisabled={!isLive}
        willStartOnFuture={willStartOnFuture}
        livepoll={props.livepoll}/>

      <br/>
      {
        showAddItemButton &&
        <ModalOpenerButton
          className={'add-item-button'}
          ModalComponent={CreateItemForm}
          openerComponentProps={{
            variant: 'extendedFab', size: "small",
            color: 'primary'
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