import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button/index';
import StarIcon from '@material-ui/icons/Star';
import './VoteCountChip.css'

const iconStyle = {
  color: '#e2cc00'
};

const VoteCountChip = React.memo(props => (
  <Button className={`vote-count-chip ${props.className}`} size={'small'}>
    <StarIcon style={iconStyle}/>&nbsp;{props.count}{!props.short && ' Votes'}
  </Button>
));

VoteCountChip.propTypes = {
  count: PropTypes.number.isRequired
};
export default VoteCountChip