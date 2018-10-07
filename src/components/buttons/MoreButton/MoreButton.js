import {Link, withRouter} from "react-router-dom";
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Button from "@material-ui/core/Button/Button";
import React from "react";
import PropTypes from 'prop-types'

const MoreButton = props => (
  <Button
    className={props.className}
    style={props.style}
    to={props.moreLink}
    component={Link}>
    <MoreIcon/>
    &nbsp;&nbsp;More
  </Button>
);

MoreButton.propTypes = {
  moreLink: PropTypes.string.isRequired,
};

export default withRouter(MoreButton)