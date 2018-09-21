import React from 'react';
import PropTypes from 'prop-types';

import './LPFormField.css'

class LPFormField extends React.Component{
  static validators = {
    checkNotNull: value => !!value,
  };
  static errorMsgs = {
    shouldNotNull: 'cannot be empty'
  };

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
      <div className={'form-field'}>
        {
          this.props.title && (
            <label>{this.props.title}<br/></label>
          )
        }
        <input name={this.props.name}
               className={'form-field-input'}
               placeholder={this.props.placeholder}
               type={this.props.type}
               defaultValue={this.props.defaultValue}
               value={this.props.value}
               onChange={this.onChange}/>
        <br/>
        {this.state.error && <span>{this.state.error}</span>}
      </div>
    )
  }
}

LPFormField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  validate: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  errorMsg: PropTypes.string.isRequired
};

export default LPFormField;