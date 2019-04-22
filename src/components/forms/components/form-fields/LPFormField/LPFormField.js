import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/index';

import './LPFormField.css'

class LPFormField extends React.Component {
  static validators = {
    checkNotNull: value => !!value,
  };
  static errorMsgs = {
    shouldNotNull: 'cannot be empty',
  };
  static createRequiredField = options => (
    <LPFormField
      className = {options.className}
      name={options.name}
      type={options.type}
      defaultValue={options.defaultValue}
      value={options.value}
      label={options.label}
      validate={options.validate || LPFormField.validators.checkNotNull}
      errorMsg={options.errorMsg || LPFormField.errorMsgs.shouldNotNull}/>
  );
  static createOptionalField = options => (
    <LPFormField
      className = {options.className}
      name={options.name}
      type={options.type}
      defaultValue={options.defaultValue}
      label={options.label}
      value={options.value}/>
  );

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
      error: false
    };
    this.onChange = this.onChange.bind(this);
    props.onChange({
      target: {
        name: props.name,
        value: props.value || props.defaultValue
      }
    });
    if (props.validate && !props.validate(props.value)) {
      props.onError({ target: {name: props.name} });
    }
    if (props.type === 'dropdown') {
      props.onChange({
        target: {
          name: props.name,
          value: props.dropdownOptions[0].value
        }
      });
    }
  }

  onChange(event) {
    let value = event.target.value;
    if (event.target.type === 'checkbox') value = event.target.checked;
    if (!this.props.validate || this.props.validate(value)) {
      this.props.onChange(event);
      this.setState({
        value: value,
        error: undefined
      })
    } else {
      this.setState({
        value: value,
        error: this.props.errorMsg || ''
      });
      this.props.onError(event);
    }
  }

  render() {
    return (
      <div className={`${this.props.className} pad10`}>
        {/*<TextField*/}
        {/*  error={!!this.state.error}*/}
        {/*  label={this.props.label}*/}
        {/*  name={this.props.name}*/}
        {/*  type={this.props.type}*/}
        {/*  value={this.state.value}*/}
        {/*  onChange={this.onChange}*/}
        {/*/>*/}
        <input
          placeholder={this.props.label}
          name={this.props.name}
          type={this.props.type}
          value={this.state.value}
          onChange={this.onChange}
        />
        <br/>
        {this.state.error && <span className={'error-span'}>{this.state.error}</span>}
      </div>
    )
  }
}

LPFormField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  validate: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  errorMsg: PropTypes.string,
  dropdownOptions: PropTypes.array,
};

export default LPFormField;