import React from 'react';
import PropTypes from 'prop-types';

import './LPFormField.css'

class LPFormField extends React.Component{
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
      title={options.title ? options.title: undefined}
      placeholder={options.placeholder ? options.placeholder: undefined}
      validate={options.validate || LPFormField.validators.checkNotNull}
      errorMsg={options.errorMsg || LPFormField.errorMsgs.shouldNotNull}/>
  );

  static createOptionalField = options => (
    <LPFormField
      className = {options.className}
      name={options.name}
      type={options.type}
      title={options.title ? options.title + ' (optional)' : undefined}
      value={options.value}
      placeholder={options.placeholder ? options.placeholder + ' (optional)' : undefined}/>
  );

  static createDropdownField = options => (
    <LPFormField
      className = {options.className}
      name={options.name}
      type={'dropdown'}
      title={options.title ? options.title + ' (optional)' : undefined}
      placeholder={options.placeholder ? options.placeholder + ' (optional)' : undefined}
      dropdownOptions={options.dropdownOptions}/>
  );

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      error: false
    };
    this.onChange = this.onChange.bind(this);

    if (props.value) {
      props.onChange({
        target: {
          name: props.name,
          value: props.value
        }
      });
    }
    if (props.validate && !props.validate(props.value)) {
      props.onError({
        target: {name: props.name}
      });
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
        error: undefined
      })
    } else {
      this.setState({
        error: this.props.errorMsg || ''
      });
      this.props.onError(event);
    }
  }

  render() {
    let inputComponent;

    if (this.props.type === 'dropdown') {
      inputComponent = (
        <select name={this.props.name}
                defaultValue={this.props.dropdownOptions[0]}
                onChange={this.onChange}
                className={'form-field-input'}>
          {
            this.props.dropdownOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
          }
        </select>
      )
    } else if (this.props.type === 'checkbox') {
      inputComponent = (
        <React.Fragment>
          <input name={this.props.name}
                 type={'checkbox'}
                 defaultValue={false}
                 value={this.state.value}
                 onChange={this.onChange}/>
          {this.props.placeholder}
        </React.Fragment>
      )
    } else {
      inputComponent = (
        <input name={this.props.name}
               className={'form-field-input'}
               placeholder={this.props.placeholder}
               type={this.props.type}
               defaultValue={this.props.defaultValue}
               value={this.state.value}
               onChange={this.onChange}/>
      )
    }
    return (
      <div className={`form-field ${this.props.className}`}>
        {
          this.props.title && (
            <label>{this.props.title}<br/></label>
          )
        }
        {inputComponent}
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
  validate: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  errorMsg: PropTypes.string,
  dropdownOptions: PropTypes.array,
};

export default LPFormField;