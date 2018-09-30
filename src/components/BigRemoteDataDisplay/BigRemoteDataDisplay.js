import React from 'react'
import PropTypes from 'prop-types'

class BigRemoteDataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.requestData(this.props.totalFetched, this.props.limit);
  }

  componentDidMount() {
    this.loadMore();
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
  limit: PropTypes.number.isRequired
};

export default BigRemoteDataDisplay