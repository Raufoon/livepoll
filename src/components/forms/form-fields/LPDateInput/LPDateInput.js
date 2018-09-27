import React from 'react';
import dateFormat from 'dateformat';
import Typography from "@material-ui/core/Typography/Typography";

import LPFormField from "../LPFormField/LPFormField";

class LPDateInput extends LPFormField{
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.defaultValue ? dateFormat(this.props.defaultValue, 'HH:MM') : '',
      date: this.props.defaultValue ? dateFormat(this.props.defaultValue, 'yyyy-mm-dd') : '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const update = () => {
      if (!this.state.date || !this.state.time) return;
      super.onChange({
        target: {
          name: this.props.name,
          value: this.state.date + 'T' + this.state.time
        }
      });
    };

    if (event.target.name.indexOf('date') !== -1) {
      this.setState({date: event.target.value}, update)
    } else {
      this.setState({time: event.target.value}, update)
    }
  }
  render() {
    return (
      <div className={`form-field ${this.props.className}`}>
        <Typography variant="subheading" gutterBottom>{this.props.label}</Typography>
        <input
          style={{border: 'none', color: 'gray'}}
          name={this.props.name + '-date'}
          type={"date"}
          value={this.state.date || this.props.defaultValue}
          onChange={this.onChange}/>
        &nbsp;
        <input
          style={{border: 'none', color: 'gray'}}
          name={this.props.name + '-time'}
          type={"time"}
          value={this.state.time || this.props.defaultValue}
          onChange={this.onChange}/>
        <br/>
        {this.state.error && <span className={'error-span'}>{this.state.error}</span>}
      </div>
    )
  }
}

export default LPDateInput