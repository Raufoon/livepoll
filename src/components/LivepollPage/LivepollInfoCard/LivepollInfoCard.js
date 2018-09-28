import React from "react";
import dateFormat from 'dateformat';
import Typography from "@material-ui/core/Typography/Typography";
import Badge from '@material-ui/core/Badge';

import './LivepollInfoCard.css'

const LivepollInfoCard = props => {
  const settings = props.livepoll.settings;
  const start = new Date(settings.startDatetime);
  const end = new Date(settings.endDatetime);
  const now = new Date();
  const endTimeExists = !!settings.endDatetime;
  const shouldDisplayLive = !endTimeExists ||(endTimeExists && now < end);

  return (
    <div>
      <Badge
        color="default"
        badgeContent={shouldDisplayLive ? 'LIVE':''}
        classes={{
          badge: shouldDisplayLive ? 'poll-live-indicator blink' : ''
        }}>
        <Typography variant="display3" gutterBottom>{props.livepoll.settings.title}</Typography>
      </Badge>

      <Typography variant="body1">Created by {props.livepoll.settings.creatorId}</Typography>

      <Typography variant="body1">
        {start >= now ? 'Will start' : 'Started'} on {dateFormat(start, 'mmm dd, yyyy')} at {dateFormat(start, 'hh:MM TT')}
      </Typography>

      {
        props.livepoll.settings.endDatetime &&
        <Typography variant="body1">Will end on {dateFormat(end, 'mmm dd, yyyy')}</Typography>
      }
    </div>
  )
};

export default LivepollInfoCard