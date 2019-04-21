import React from "react";
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import ImageButton from "../../../../components/ImageButton";
import {FIRST_TROPHY_IMG_URL} from "../../../../constants/livepoll-constants";


const styles = () => ({
  container: {
    fontFamily: 'Comfortaa',
    color: '#222',
    fontWeight: 'normal',
    paddingLeft: 20
  }
});

const LivepollInfoCard = props => {
  const {
    classes,
    className,
    creatorName,
    startDatetime,
    endDatetime,
    totalVotes
  } = props;
  const start = new Date(startDatetime);
  const end = new Date(endDatetime);
  const now = new Date();
  const endTimeExists = !!endDatetime;
  const willStartOnFuture = now < start;
  const hasEnded = endTimeExists && now >= end;

  return (
    <div className={`${className} ${classes.container}`}>
      <h4>
        Created by {creatorName}
      </h4>
      {hasEnded && <h4>Poll has ended</h4>}
      <h5>
        {willStartOnFuture ? 'Will start':'Created'} on {dateFormat(start, 'mmm dd, yyyy')} at {dateFormat(start, 'hh:MM TT')}
      </h5>
      {
        endDatetime && !hasEnded && (
          <h5>
            Will end on {dateFormat(end, 'mmm dd, yyyy')} at {dateFormat(end, 'hh:MM TT')}
          </h5>
        )
      }
      {
        !willStartOnFuture && (
          <React.Fragment>
            <h5>Total Votes: {totalVotes}</h5>
            <ImageButton src={FIRST_TROPHY_IMG_URL} text={'*first item here*'} iconHeight={100}/>
            <br/>
            <ImageButton src={FIRST_TROPHY_IMG_URL} text={'*second item here*'} iconHeight={100}/>
          </React.Fragment>
        )
      }
    </div>
  )
};

LivepollInfoCard.propTypes = {
  hasEnded: PropTypes.bool,
  willStartOnFuture: PropTypes.bool,
  creatorName: PropTypes.string.isRequired,
  startDatetime: PropTypes.string.isRequired,
  endDatetime: PropTypes.string,
  totalVotes: PropTypes.number.isRequired,
};

export default React.memo(withStyles(styles)(LivepollInfoCard))