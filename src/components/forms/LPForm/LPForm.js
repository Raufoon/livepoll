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
    let removedErrors = {};
    let value = event.target.value;
    if (event.target.type === 'checkbox') value = event.target.checked;

    newField[event.target.name] = value;
    removedErrors[event.target.name] = false;

    this.setState((oldState) => ({
      errors: {
        ...oldState.errors,
        ...removedErrors
      },
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
    this.setState((oldState) => ({
      ...oldState,
      errors: {
        ...oldState.errors,
        ...newErrors
      }
    }))
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.fields);
  }

  shouldShowSubmit() {
    return !Object.values(this.state.errors).some(flag => !!flag);
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
  submitButtonLabel: PropTypes.string,
};

export default LPForm;