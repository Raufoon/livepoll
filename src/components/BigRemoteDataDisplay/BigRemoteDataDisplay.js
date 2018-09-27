import React from 'react'
import PropTypes from 'prop-types'

class BigRemoteDataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    let itemKeys = Object.keys(this.props.getStateData());
    this.props.requestData(this.props.limit, itemKeys[itemKeys.length - 1]);
  }

  componentDidMount() {
    if (Object.keys(this.props.getStateData()).length === 0)
      this.props.requestData(this.props.limit)
  }

  render() {
    const ChildComponent = this.props.childComponent;
    return (
      <React.Fragment>
        <ChildComponent {...this.props.getChildProps()}/>
        {/*<button onClick={this.loadMore}>Load more</button>*/}
      </React.Fragment>
    );
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