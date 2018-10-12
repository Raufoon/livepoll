import React from "react";
import dateFormat from 'dateformat';
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

import MediaQuery from "react-responsive";
import PollSettings from "../../../util/poll/poll-definitions/poll-settings";

const LivepollInfoCard = props => {
  const settings = props.livepoll.settings;
  const start = new Date(settings.startDatetime);
  const end = new Date(settings.endDatetime);

  return (
    <div className={props.className}>
      <MediaQuery minWidth={800}>
        <Typography variant="h4" gutterBottom>About this poll</Typography>
      </MediaQuery>
      <MediaQuery maxWidth={799}>
        <Typography variant="h5" gutterBottom>About this poll</Typography>
      </MediaQuery>
      <br/>

      <Typography variant="body2">
        Created by&nbsp;&nbsp;<Chip label={props.livepoll.settings.creatorName}/>
      </Typography>

      <Typography variant="body2">
        {
          props.willStartOnFuture ?
            'Will start' : 'Started'} on {dateFormat(start, 'mmm dd, yyyy')} at {dateFormat(start, 'hh:MM TT')}
      </Typography>

      <Typography variant="body2">
        {
          settings.endDatetime && (
            `${props.hasEnded ? 'Ended' : 'Will end'} on ${dateFormat(end, 'mmm dd, yyyy')} at ${dateFormat(end, 'hh:MM TT')}`
          )
        }
        {
          !settings.endDatetime && ('Will never expire')
        }
      </Typography>
      <Typography variant="body2">
        {
          settings.othersCanAdd ? 'Anyone': 'Only creator'
        }
        &nbsp;can add to this poll
      </Typography>
      <Typography variant="body2">
        {
          !settings.showVoters ? 'Secret vote': 'Click on the votes to view the voter list'
        }
      </Typography>
      <Typography variant="body2">
        {
          settings.itemFormat === PollSettings.POLL_ITEM_FORMAT.TEXT && 'Items must be a single line text'
        }
      </Typography>
    </div>
  )
};

LivepollInfoCard.propTypes = {
  hasEnded: PropTypes.bool,
  isLive: PropTypes.bool,
  willStartOnFuture: PropTypes.bool,
  livepoll: PropTypes.object,
};

export default LivepollInfoCard