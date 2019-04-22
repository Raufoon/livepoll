import React from 'react'
import PropTypes from 'prop-types'
import LPFormField from "../LPFormField/LPFormField";
import Typography from "@material-ui/core/Typography/Typography";

class LPDropdownInput extends LPFormField {
  static createDropdownField = options => (
    <LPDropdownInput
      className = {options.className}
      name={options.name}
      type={'dropdown'}
      label={options.label}
      dropdownOptions={options.dropdownOptions}/>
  );

  render() {
    return (
      <div className={`${this.props.className} pad10`}>
        <label className={'font-comf'} >{this.props.label}</label>
        <br/>
        <select name={this.props.name}
                defaultValue={this.props.dropdownOptions[0]}
                onChange={this.onChange}>
          {
            this.props.dropdownOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          }
        </select>
      </div>
    )
  }
}

LPDropdownInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default LPDropdownInput