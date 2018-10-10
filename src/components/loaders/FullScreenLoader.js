import React from 'react'

import CentralLoader from "./CentralLoader";

const fullScreenLoader = {
  height: '100%',
  width: '100%',
  position: 'fixed',
  zIndex: 3000,
  backgroundColor: '#eeeeee'
};

const FullScreenLoader = () => (
  <div style={fullScreenLoader}>
    <CentralLoader/>
  </div>
);

export default FullScreenLoader