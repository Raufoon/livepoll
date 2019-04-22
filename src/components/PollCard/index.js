import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles/index';
import styles from './styles'
import TextItem from "../poll-items/TextPollItem";

const PollCard = props => {
  const {
    title, topItems, id, isLive, classes, className
  } = props;

  return (
    <div className={`${classes.card} pure-menu-list ${className}`}>
      <div className={`pure-menu-item ${classes.title}`}>{title}</div>
      {
        topItems.map((item, index) => <TextItem index={1+index} voteDisabled={true} item={item}/>)
      }
    </div>
  )
};

PollCard.propTypes = {
  title: PropTypes.string.isRequired,
  topItems: PropTypes.array.isRequired,
  isLive: PropTypes.bool,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default withStyles(() => styles) (PollCard)