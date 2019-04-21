import React from 'react';
import PropTypes from 'prop-types';


const ImageButton = props => {
  const {
    text,
    iconHeight,
    src,
    className,
    textClassName,
    children,
    onClick,
    ContainerComponent,
    TextComponent,
    ...restProps
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

  const Text = TextComponent || 'span';
  const Container = ContainerComponent || 'div';

  return (
    <Container
      className={`pure-button ${className}`}
      style={styles.container}
      {...restProps}
      onClick={onClick}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        {
          src && <img style={styles.icon} src={src}/>
        }
        {
          src && <span>&nbsp;&nbsp;</span>
        }
        {
          (text || children) && <Text className={textClassName}>{text || children}</Text>
        }
      </div>
    </Container>
  )
};

ImageButton.propTypes = {
  text: PropTypes.string,
  src: PropTypes.string,
  iconHeight: PropTypes.number,
  TextComponent: PropTypes.func,
};

export default ImageButton;