import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import ImageButton from "../../../utils/ImageButton";
import {STAR_URL} from "../../../../constants/livepoll-constants";


const styles = () => ({
  voteButton: {
    textTransform: 'uppercase',
    fontWeight: 'normal',
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
    height: '100%',
    marginLeft: 10
  }
});

const TextPollItem = props => {
  const {
    classes,
    item,
    index,
    isAlreadyVoted,
    isPercentView,
    totalVotes,
    vote,
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
      <div className={`pure-u-2-24 ${classes.itemSerial} vert-cent`} style={serialStyle}>{index}</div>
      <div className="pure-u-22-24">
        <div className={'pure-g mg5'}>
          <label className={`pure-u-1-1 ${classes.itemText}`}>{item.content.text}</label>
          <div className={`tac pure-u-1-1 ${classes.voteCounter}`}>
            <ImageButton
              src={STAR_URL}
              iconHeight={10}
              text={`${voteAmount} votes`}
            />
            <button className={`pure-button fr ${classes.voteButton}`} onClick={vote} style={voteButtonStyle}>
              {isAlreadyVoted ? 'Unvote':'Vote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

TextPollItem.propTypes = {
  isAlreadyVoted: PropTypes.bool,
  voteDisabled: PropTypes.bool,
  vote: PropTypes.func,
  item: PropTypes.object,
  pollId: PropTypes.string,
  index: PropTypes.number,
  voterList: PropTypes.array,
};

export default React.memo(withStyles(styles)(TextPollItem));