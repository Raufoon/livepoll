import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import ModalOpenerButton from "../../modal-openers/ModalOpenerButton/ModalOpenerButton";
import CreateItemForm from "../../forms/CreateItemForm/CreateItemForm";

const LivepollInfoCard = props => {
  const settings = props.livepoll.settings;

  const showAddItemButton = settings.othersCanAdd || (!settings.othersCanAdd && settings.creatorId === props.authUserId);

  return (
    <div>
      <h2>{props.livepoll.settings.title}</h2>

      <span>Created by {props.livepoll.settings.creatorId}</span><br/>
      <span>Starts at {props.livepoll.settings.startDatetime}</span><br/>
      <span>{props.livepoll.settings.endDatetime? 'Never ends' : `Ends at ${props.livepoll.settings.endDatetime}`}</span><br/>
      <span>{props.livepoll.settings.isPrivate?'Private poll' : 'Public poll'}</span><br/>
      <span>{props.livepoll.settings.othersCanAdd?'Anyone ' : 'Only creator '}can add item</span><br/>
      <span>Item format: {props.livepoll.settings.itemFormat}</span><br/>
      <span>Vote by {props.livepoll.settings.voteType === 'T' ? 'tick':'number'}</span><br/>

      {
        showAddItemButton &&
        <ModalOpenerButton
          ModalComponent={CreateItemForm}
          childProps={{
            pollId: props.livepoll.id,
            format: props.livepoll.settings.itemFormat,
          }}
        >
          Add an item
        </ModalOpenerButton>
      }
    </div>
  )
};
const s2p = state => ({
  authUserId: state.auth.userData.id,
});

LivepollInfoCard.propTypes = {
  authUserId: PropTypes.string.isRequired
};

export default connect(s2p)(LivepollInfoCard)