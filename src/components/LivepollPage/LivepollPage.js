import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  actionFetchPollInfo,
  actionGiveVote,
  actionRequestFirstNItems
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
  const showAddItemButton
    = settings.othersCanAdd || (!settings.othersCanAdd && settings.creatorId === props.authUserId);

  return (
    <div>
      <LivepollInfoCard livepoll={props.livepoll} />

      <br/><br/>

      <BigRemoteDataDisplay
        childComponent={LivepollItemList}
        getStateData={() => props.livepoll.items || {}}
        requestData={(limit, startItemId) =>
          props.dispatch(actionRequestFirstNItems(props.livepoll.id, limit, startItemId))
        }
        getChildProps={()=>({
          items: props.livepoll.items,
          vote: (itemId) => {
            props.dispatch(actionGiveVote(props.livepoll.id, itemId, props.lastVotedItemId))
          },
          itemFormat: props.livepoll.settings.itemFormat
        })}
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
};

export default connect(s2p)(withRouter(LivepollPage))