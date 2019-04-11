import React from 'react';
import PropTypes from 'prop-types';


const ImageButton = props => {
  const {
    text,
    iconHeight,
    src,
    className,
    textClassName,
  } = props;

  const styles = {
    container: {
      fontFamily: 'Comfortaa',
      backgroundColor: 'transparent'
    },
    icon: {
      height: iconHeight || 20,
      width: iconHeight || 20,
      display: 'block'
    }
  };

  const TextComponent = props.TextComponent || 'span';

  return (
    <div className={`pure-button ${className}`} style={styles.container} >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img style={styles.icon} src={src}/>
        &nbsp;&nbsp;
        <TextComponent className={textClassName}>{text}</TextComponent>
      </div>
    </div>
  )
};

ImageButton.propTypes = {
  text: PropTypes.string,
  src: PropTypes.string,
  iconHeight: PropTypes.number,
  TextComponent: PropTypes.func,
};

export default ImageButton;