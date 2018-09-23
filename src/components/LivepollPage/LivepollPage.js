import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {actionFetchPollInfo} from "../../state-management/actions/livepoll-actions";
import PollSettings from "../../util/poll/poll-definitions/poll-settings";
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import CreateItemForm from "../forms/CreateItemForm/CreateItemForm";

const LivepollPage = props => {
  const pid = props.match.params.id;

  if (!props.livepoll) {
    props.dispatch(actionFetchPollInfo(pid));
    return "loading..."
  }

  const settings = props.livepoll.settings;

  const showAddItemButton = settings.whoCanAddItem === PollSettings.WHO_CAN_ADD_ITEM.ANYONE
    || (settings.whoCanAddItem === PollSettings.WHO_CAN_ADD_ITEM.ONLY_CREATOR
      && settings.creatorId === props.authUserId
    );

  return (
    <div>
      Poll:
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
      <br/>
      {
        JSON.stringify(props.livepoll)
      }
      <br/>
    </div>
  )
};

const s2p = (state, ownProps) => ({
  authUserId: state.auth.userData.id,
  livepoll: state.polls[ownProps.match.params.id]
});

LivepollPage.propTypes = {
  authUserId: PropTypes.string.isRequired,
  livepoll: PropTypes.object,
};

export default connect(s2p)(withRouter(LivepollPage))