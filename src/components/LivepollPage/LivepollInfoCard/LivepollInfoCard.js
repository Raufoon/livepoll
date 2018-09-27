import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import dateFormat from 'dateformat';
import Typography from "@material-ui/core/Typography/Typography";
import Badge from '@material-ui/core/Badge';

import './LivepollInfoCard.css'
import ModalOpenerButton from "../../modal-openers/ModalOpenerButton/ModalOpenerButton";
import CreateItemForm from "../../forms/CreateItemForm/CreateItemForm";

const LivepollInfoCard = props => {
  const settings = props.livepoll.settings;
  const start = new Date(props.livepoll.settings.startDatetime);
  const end = new Date(props.livepoll.settings.endDatetime);
  const now = new Date();
  const endTimeExists = !!props.livepoll.settings.endDatetime;
  const shouldDisplayLive = !endTimeExists ||(endTimeExists && now < end);
  const showAddItemButton = settings.othersCanAdd
    || (!settings.othersCanAdd && settings.creatorId === props.authUserId);

  return (
    <div>
      {
        shouldDisplayLive && (
          <Badge color="default"
                 badgeContent={shouldDisplayLive ? 'LIVE':''}
                 classes={{
                   badge: 'poll-live-indicator blink'
                 }}>
            <Typography variant="display3" gutterBottom>{props.livepoll.settings.title}</Typography>
          </Badge>
        )
      }
      {
        !shouldDisplayLive && (
          <Typography variant="display3" gutterBottom>{props.livepoll.settings.title}</Typography>
        )
      }
      <Typography variant="body1">Created by {props.livepoll.settings.creatorId}</Typography>
      {
        start >= now &&
        <Typography variant="body1">
          Will start on {dateFormat(start, 'mmm dd, yyyy')} at {dateFormat(start, 'hh:MM TT')}
        </Typography>
      }
      {
        start < now &&
        <Typography variant="body1">
          Started on {dateFormat(start, 'mmm dd, yyyy')} at {dateFormat(start, 'hh:MM TT')}
        </Typography>
      }
      {
        props.livepoll.settings.endDatetime &&
        <Typography variant="body1">Will end on {dateFormat(end, 'mmm dd, yyyy')}</Typography>
      }
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
        >
          Add an item
        </ModalOpenerButton>
      }
    </div>
  )
};
const s2p = state => ({
  authUserId: state.auth.currentUser.uid,
});

LivepollInfoCard.propTypes = {
  authUserId: PropTypes.string.isRequired
};

export default connect(s2p)(LivepollInfoCard)