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
      name={options.name}
      type={options.type}
      title={options.title}
      defaultValue={options.defaultValue}
      placeholder={options.placeholder}
      validate={LPFormField.validators.checkNotNull}
      errorMsg={LPFormField.errorMsgs.shouldNotNull}/>
  );

  static createOptionalField = options => (
    <LPFormField
      name={options.name}
      type={options.type}
      title={options.title + ' (optional)'}
      value={options.value}
      placeholder={options.placeholder + ' (optional)'}/>
  );

  static createDropdownField = options => (
    <LPFormField
      name={options.name}
      type={'dropdown'}
      title={options.title}
      dropdownOptions={options.dropdownOptions}
      placeholder={options.placeholder}/>
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
    if (!this.props.validate || this.props.validate(event.target.value)) {
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
    return (
      <div className={'form-field'}>
        {
          this.props.title && (
            <label>{this.props.title}<br/></label>
          )
        }
        {
          this.props.type === 'dropdown' ? (
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
          ): (
            <input name={this.props.name}
                   className={'form-field-input'}
                   placeholder={this.props.placeholder}
                   type={this.props.type}
                   defaultValue={this.props.defaultValue}
                   value={this.state.value}
                   onChange={this.onChange}/>
          )
        }
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