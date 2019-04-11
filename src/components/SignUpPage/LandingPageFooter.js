import React from 'react';
import ImageButton from "../utils/ImageButton";

export const REACT_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Freact-min.png?alt=media&token=bf9f9724-f30d-43ac-9bda-940d77cf82b4';
export const REDUX_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fredux-min.png?alt=media&token=0e05e66f-8e2c-48f5-8dc4-9c54d37ad5c0';
export const PWA_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fpwa-min.png?alt=media&token=1801672c-f07a-4f94-b066-59a377eb1eae';
export const GRAPHQL_LOGO = 'https://firebasestorage.googleapis.com/v0/b/lllivepolll.appspot.com/o/landingpage%2Fgraphql.png?alt=media&token=4275fea8-53a0-4d63-b48b-0e2f2612f679';

const footerItems = [
  { src: REACT_LOGO, label: 'Built with React' },
  { src: REDUX_LOGO, label: 'Redux State at Worker' },
  { src: PWA_LOGO, label: 'Progressive Web App' },
  { src: GRAPHQL_LOGO, label: 'Served with GraphQL' },
];

const LandingPageFooter = props => {
  const {
    containerClass, innerClass, featureItemClass, isForMobile
  } = props;

  return (
    <div className={containerClass}>
      <div className={innerClass}>
        {
          footerItems.map(item => (
            <ImageButton
              key={item.label}
              className={featureItemClass}
              src={item.src}
              text={!isForMobile ? item.label: undefined}
              iconHeight={30}/>
          ))
        }
      </div>
    </div>
  )
};

export default LandingPageFooter