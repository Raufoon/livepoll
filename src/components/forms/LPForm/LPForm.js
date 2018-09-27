import React from 'react'
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import Button from '@material-ui/core/Button';

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
      <form className={this.props.className} method={'post'} onSubmit={this.onSubmit}>
        { this.props.title &&
          <Typography variant="headline" gutterBottom>{this.props.title}</Typography>
        }
        {
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
              onChange: this.onChange,
              onError: this.onError,
            })
          )
        }
        <br/>
        {
          this.shouldShowSubmit() &&
          <Button type='submit' variant={"contained"} color="secondary" >
            {this.props.submitButtonLabel || 'Submit'}
          </Button>
        }
      </form>
    )
  }
}

LPForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string,
};

export default LPForm;