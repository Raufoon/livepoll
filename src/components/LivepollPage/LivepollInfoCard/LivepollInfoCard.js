import React from "react";
import dateFormat from 'dateformat';
import Typography from "@material-ui/core/Typography/Typography";
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import MediaQuery from 'react-responsive';

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
        <MediaQuery orientation={'landscape'}>
          <Typography variant="display3" gutterBottom>{props.livepoll.settings.title}</Typography>
        </MediaQuery>
        <MediaQuery orientation={'portrait'}>
          <Typography variant="display1" gutterBottom>{props.livepoll.settings.title}</Typography>
        </MediaQuery>
      </Badge>

      {
        props.livepoll.settings.isPrivate && (
          <Typography color={'secondary'} variant="button">Private poll - share by link</Typography>
        )
      }

      <Typography variant="body1">
        Created by&nbsp;&nbsp;&nbsp;
        <Chip
          avatar={<Avatar variant="outlined">{props.livepoll.settings.creatorName[0]}</Avatar>}
          label={props.livepoll.settings.creatorName}
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

LivepollInfoCard.propTypes = {
  hasEnded: PropTypes.bool,
  isLive: PropTypes.bool,
  willStartOnFuture: PropTypes.bool,
  livepoll: PropTypes.object,
};

export default LivepollInfoCard