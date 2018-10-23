import React from "react";
import dateFormat from 'dateformat';
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from "react-responsive";
import TimeIcon from '@material-ui/icons/Watch';
import DateIcon from '@material-ui/icons/DateRange';

import PollSettings from "../../../util/poll/poll-definitions/poll-settings";

const styles = theme => ({
  dateTime: {
    color: 'gray'
  }
});

const LivepollInfoCard = props => {
  const settings = props.livepoll.settings;
  const start = new Date(settings.startDatetime);
  const end = new Date(settings.endDatetime);

  const {classes} = props;
  return (
    <div className={props.className}>
      <Typography variant="h5" gutterBottom>About this poll</Typography>
      <br/>

      <Typography variant="subtitle1">
        Created by&nbsp;&nbsp;<Chip label={props.livepoll.settings.creatorName}/>
      </Typography>

      <br/>

      <Button className={classes.dateTime}>
        <DateIcon/>&nbsp;{dateFormat(start, 'mmm dd, yyyy')}
      </Button>
      <Button className={classes.dateTime}>
        <TimeIcon/>&nbsp;{dateFormat(start, 'hh:MM TT')}
      </Button>

      <br/>
      {
        settings.endDatetime && (
          <div>
            <Button className={classes.dateTime}>
              <DateIcon/>&nbsp;{dateFormat(end, 'mmm dd, yyyy')}
            </Button>
            <Button className={classes.dateTime}>
              <TimeIcon/>&nbsp;{dateFormat(end, 'hh:MM TT')}
            </Button>
          </div>
        )
      }
      <br/><br/>

      <Typography variant="body1">
        <b>{props.livepoll.totalVotes}</b> people have voted in this poll.&nbsp;
        <b>
          { settings.othersCanAdd ? 'Anyone': 'Only creator' }
        </b>&nbsp;can add items to this poll. Voter list is&nbsp;
        <b>
          { !settings.showVoters ? 'hidden.': 'visible.'}
        </b>&nbsp;
        Items must be&nbsp;
        <b>
          { settings.itemFormat === PollSettings.POLL_ITEM_FORMAT.TEXT && 'single line text'}
        </b>.
        {
          !settings.endDatetime && ' This poll will never end.'
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

export default withStyles(styles)(LivepollInfoCard)