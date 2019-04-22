import React from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/index';

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

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }
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
      <form className={`${this.props.className} pure-g`} method={'post'} onSubmit={this.onSubmit}>
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
          this.shouldShowSubmit() && (
            <div className={'pure-u-1-1'}>
              <Button type='submit' variant={"contained"} color="secondary" >
                {this.props.submitButtonLabel || 'Submit'}
              </Button>
            </div>
          )
        }
      </form>
    )
  }
}

LPForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string,
};

export default LPForm;