import React from 'react'
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
      <React.Fragment>
        <Typography variant="subheading" gutterBottom>{this.props.label}</Typography>
        <select name={this.props.name}
                defaultValue={this.props.dropdownOptions[0]}
                onChange={this.onChange}
                className={'form-field-input'}>
          {
            this.props.dropdownOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          }
        </select>
      </React.Fragment>
    )
  }
}

export default LPDropdownInput