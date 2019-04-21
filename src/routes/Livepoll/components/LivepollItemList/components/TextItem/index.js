import React from 'react'
import { withStyles } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types'
import ImageButton from "../../../../../../components/ImageButton";
import {STAR_URL} from "../../../../../../constants/livepoll-constants";
import Responsive, {MEDIUM_AND_LARGE_SCREEN, PHONE_SCREEN} from "../../../../../../components/Responsive";
import style from "./styles";

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

  const voteButtonStyle = {color: isAlreadyVoted ? 'darkred':'black'};
  const serialStyle = {backgroundColor: '#eeeeee'};
  if (index === 1) {
    serialStyle.backgroundColor = '#f7c741';
    serialStyle.color = 'white';
  } else if (index === 2) {
    serialStyle.backgroundColor = '#f7bf8f';
    serialStyle.color = 'white';
  }

  const voteAmount = isPercentView ?
    `${parseInt((item.voteCount / totalVotes) * 100, 10)}%`
    : item.voteCount;

  return (
    <div className={`pure-g ${classes.item}`}>
      <div className={`pure-u-2-24 ${classes.itemSerial} vert-cent`} style={serialStyle}>{index}</div>
      <div className={`pure-u-1-24`} />
      <div className={`pure-u-14-24 ${classes.itemText} vert-cent`}>{item.content.text}</div>
      <ImageButton
        className={`pure-u-4-24`}
        src={STAR_URL}
        iconHeight={15}
        text={`${voteAmount}`}
      />
      <Responsive screen={MEDIUM_AND_LARGE_SCREEN}>
        {
          !voteDisabled && (
            <button className={`pure-u-3-24 pure-button ${classes.voteButton}`} onClick={vote} style={voteButtonStyle}>
              {isAlreadyVoted ? 'Unvote':'Vote'}
            </button>
          )
        }
      </Responsive>
      <Responsive screen={PHONE_SCREEN}>
        {
          !voteDisabled && (
            <div className={'pure-u-3-24 vert-cent'}>
              <input type="checkbox" checked={isAlreadyVoted} onChange={vote}/>
            </div>
          )
        }
      </Responsive>
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

export default React.memo(withStyles(() => style)(TextItem));