import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/StarBorder';

const style = {
  color: 'grey',
  padding: 0
};

const VoteCountChip = props => (
  <Button component={'p'} className={props.className} style={style} size={"small"}>
    <StarIcon/>&nbsp;{`${props.count} votes`}
  </Button>
);

VoteCountChip.propTypes = {
  count: PropTypes.number.isRequired
};
export default VoteCountChip