import React from 'react'
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";

export const PHONE_SCREEN = 'PHONE_SCREEN';
export const MEDIUM_SCREEN = 'MEDIUM_SCREEN';
export const MEDIUM_AND_LARGE_SCREEN = 'MEDIUM_AND_LARGE_SCREEN';
export const LARGE_SCREEN = 'LARGE_SCREEN';

const Responsive = ({children, screen, ...restProps}) => {
  let query = {};
  switch (screen) {
    case PHONE_SCREEN:
      query.maxWidth = '799px';
      break;
    case MEDIUM_SCREEN:
      query.minWidth = '800px';
      query.maxWidth = '1499px';
      break;
    case MEDIUM_AND_LARGE_SCREEN:
      query.minWidth = '800px';
      break;
    case LARGE_SCREEN:
      query.minWidth = '1500px';
      break;
    default:
      throw Error('invalid media query');
  }
  return (
    <MediaQuery {...query} {...restProps}>
      {children}
    </MediaQuery>
  )
};

Responsive.propTypes = {
  screen: PropTypes.oneOf([PHONE_SCREEN, MEDIUM_SCREEN, MEDIUM_AND_LARGE_SCREEN, LARGE_SCREEN])
};

export default Responsive;
