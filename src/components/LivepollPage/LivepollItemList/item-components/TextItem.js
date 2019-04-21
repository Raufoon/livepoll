import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import ImageButton from "../../../utils/ImageButton";
import {STAR_URL} from "../../../../constants/livepoll-constants";


const styles = () => ({
  voteButton: {
    textTransform: 'uppercase',
    fontSize: 'small',
    fontWeight: 'bold'
  },
  voteCounter: {
    fontSize: 'x-small',
    fontWeight: 'bold',
    color: '#222',
    textTransform: 'uppercase'
  },
  itemSerial: {
    color: '#19564c',
    fontWeight: 'bold',
    fontSize: 'large',
  },
  item: {
    fontFamily: 'Comfortaa',
    marginBottom: '10px',
    backgroundColor: '#fbfbfb',
    border: '1px solid lightgrey',
    borderRadius: '5px'
  },
  itemText: {
    fontSize: 'large',
    justifyContent: 'left'
  }
});

const TextItem = props => {
  const {
    classes,
    item,
    index,
    isAlreadyVoted,
    isPercentView,
    totalVotes,
    vote,
    voteDisabled
  } = props;

  const serialStyle = {backgroundColor: '#eeeeee'};
  const voteButtonStyle = {color: isAlreadyVoted ? 'darkred':'black'};

  if (index === 1) {
    serialStyle.backgroundColor = '#f7c741';
    serialStyle.color = 'white';
  }
  else if (index === 2) {
    serialStyle.backgroundColor = '#f7bf8f';
    serialStyle.color = 'white';
  }
  const voteAmount = isPercentView ? `${parseInt((item.voteCount / totalVotes) * 100, 10)}%` : item.voteCount;

  return (
    <div className={`pure-g ${classes.item}`}>
      <div className={`pure-u-3-24 ${classes.itemSerial} vert-cent`} style={serialStyle}>{index}</div>
      <div className={`pure-u-1-24`} />
      <div className={`pure-u-11-24 ${classes.itemText} vert-cent`}>{item.content.text}</div>
      <ImageButton
        className={`pure-u-6-24`}
        src={STAR_URL}
        iconHeight={10}
        text={`${voteAmount} votes`}
      />
      {
        !voteDisabled && (
          <button className={`pure-u-3-24 pure-button ${classes.voteButton}`} onClick={vote} style={voteButtonStyle}>
            {isAlreadyVoted ? 'Unvote':'Vote'}
          </button>
        )
      }
    </div>
  )
};

TextItem.propTypes = {
  isAlreadyVoted: PropTypes.bool,
  voteDisabled: PropTypes.bool,
  vote: PropTypes.func,
  item: PropTypes.object,
  pollId: PropTypes.string,
  index: PropTypes.number,
  voterList: PropTypes.array,
};

export default React.memo(withStyles(styles)(TextItem));