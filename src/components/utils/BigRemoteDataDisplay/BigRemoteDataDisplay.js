import React from 'react'
import PropTypes from 'prop-types'

class BigRemoteDataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.doRequest(this.props.totalFetched, this.props.limit);
  }

  componentDidMount() {
    this.loadMore();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

BigRemoteDataDisplay.propTypes = {
  doRequest: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  totalFetched: PropTypes.number.isRequired,
};

export default BigRemoteDataDisplay