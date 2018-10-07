import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';

const buttonStyle = {
  color: 'grey',
  padding: 0
};

const iconStyle = {
  color: 'yellow'
};

const VoteCountChip = props => (
  <Button component={'p'} className={props.className} style={buttonStyle} size={"small"}>
    <StarIcon style={iconStyle}/>&nbsp;{`${props.count} votes`}
  </Button>
);

VoteCountChip.propTypes = {
  count: PropTypes.number.isRequired
};
export default VoteCountChip