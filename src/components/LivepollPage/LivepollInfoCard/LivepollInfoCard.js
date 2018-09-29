import React from "react";
import dateFormat from 'dateformat';
import Typography from "@material-ui/core/Typography/Typography";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import './LivepollInfoCard.css'

const LivepollInfoCard = props => {
  const settings = props.livepoll.settings;
  const start = new Date(settings.startDatetime);
  const end = new Date(settings.endDatetime);

  return (
    <div>
      <Badge
        color="default"
        badgeContent={props.isLive ? 'LIVE':''}
        classes={{
          badge: props.isLive ? 'poll-live-indicator blink' : ''
        }}>
        <Typography variant="display3" gutterBottom>{props.livepoll.settings.title}</Typography>
      </Badge>

      <Typography variant="body1">
        Created by&nbsp;
        <Chip
          avatar={<Avatar>{props.livepoll.settings.creatorId[0]}</Avatar>}
          label={props.livepoll.settings.creatorId}
        />
      </Typography>

      <Typography variant="body1">
        {props.willStartOnFuture ? 'Will start' : 'Started'} on {dateFormat(start, 'mmm dd, yyyy')} at {dateFormat(start, 'hh:MM TT')}
      </Typography>

      {
        props.livepoll.settings.endDatetime &&
        <Typography variant="body1">
          {props.hasEnded ? 'Ended' : 'Will end'} on {dateFormat(end, 'mmm dd, yyyy')} at {dateFormat(end, 'hh:MM TT')}
        </Typography>
      }
    </div>
  )
};

export default LivepollInfoCard