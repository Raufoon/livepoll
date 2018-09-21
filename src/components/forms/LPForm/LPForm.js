import React from 'react'
import PropTypes from 'prop-types';

class LPForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onError = this.onError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.shouldShowSubmit = this.shouldShowSubmit.bind(this);
  }

  onChange(event) {
    let newField = {};
    newField[event.target.name] = event.target.value;

    this.setState((oldState) => ({
      ...oldState,
      fields: {
        ...oldState.fields,
        ...newField
      }
    }))
  }

  onError(event) {
    let newErrors = {
      ...this.state.errors
    };
    newErrors[event.target.name] = true;
    this.setState({errors: newErrors});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.fields);
  }

  shouldShowSubmit() {
    return Object.values(this.state.fields).length === this.props.totalFields;
  }

  render() {
    return (
      <form method={'post'} onSubmit={this.onSubmit}>
        <b>{this.props.title}</b>
        {
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
              onChange: this.onChange,
              onError: this.onError,
            })
          )
        }
        {
          this.shouldShowSubmit() && <input type='submit' value={this.props.submitButtonLabel || 'Submit'}/>
        }
      </form>
    )
  }
}

LPForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  totalFields: PropTypes.number.isRequired,
  submitButtonLabel: PropTypes.string,
};

export default LPForm;