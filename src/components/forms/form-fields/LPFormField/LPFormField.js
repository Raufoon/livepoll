import React from 'react';
import PropTypes from 'prop-types';

class LPFormField extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      error: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (this.props.validate(event.target.value)) {
      this.props.onChange(event);
      this.setState({
        error: undefined
      })
    } else {
      this.setState({
        error: this.props.errorMsg
      });
      this.props.onError(event);
    }
  }

  render() {
    return (
      <div>
        <input name={this.props.name}
               placeholder={this.props.placeholder}
               type={this.props.type}
               defaultValue={this.props.defaultValue}
               value={this.props.value}
               onChange={this.onChange}/>
        {this.state.error && <span>{this.state.error}</span>}
      </div>
    )
  }
}

LPFormField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  errorMsg: PropTypes.string.isRequired
};

export default LPFormField;