import React from 'react'
import PropTypes from 'prop-types'

class BigRemoteDataDisplay extends React.Component {
  componentDidMount() {
    if (Object.keys(this.props.getStateData()).length === 0)
      this.props.requestData(this.props.limit, '0')
  }

  render() {
    if (Object.keys(this.props.getStateData()).length === 0) return "loading..";
    const ChildComponent = this.props.childComponent;
    return <ChildComponent {...this.props.getChildProps()}/>;
  }
}

BigRemoteDataDisplay.propTypes = {
  childComponent: PropTypes.func.isRequired,
  getChildProps: PropTypes.func.isRequired,
  requestData: PropTypes.func.isRequired,
  getStateData: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired
};

export default BigRemoteDataDisplay