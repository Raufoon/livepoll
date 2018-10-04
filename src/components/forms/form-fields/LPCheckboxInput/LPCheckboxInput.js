import React from 'react'
import PropTypes from 'prop-types'
import LPFormField from "../LPFormField/LPFormField";
import Switch from "@material-ui/core/Switch/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class LPCheckboxInput extends LPFormField {
  render() {
    return (
      <FormControlLabel
        className={`form-field ${this.props.className}`}
        name={this.props.name}
        control={
          <Switch
            checked={this.state.value}
            onChange={this.onChange}
          />
        }
        label={this.props.label}
      />
    )
  }
}

LPCheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default LPCheckboxInput