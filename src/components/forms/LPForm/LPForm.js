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
    let newFields = {
      ...this.state.fields
    };
    newFields[event.target.name] = event.target.value;
    this.setState({fields: newFields});
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
    return Object.values(this.state.fields).length === this.props.children.length;
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
          this.shouldShowSubmit() && <input type='submit' value={'Submit'}/>
        }
      </form>
    )
  }
}

LPForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LPForm;