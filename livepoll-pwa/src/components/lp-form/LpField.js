import React, {useState} from 'react'
import PropTypes from 'prop-types'

function LpField(props) {
  const {Component, className, onChange, onError} = props
  const {type, name, validate, errorMsg, title} = props
  const [hasError, setError] = useState(false)

  function onMyError(shouldErr = true) {
    setError(shouldErr)
    onError(name, shouldErr)
  }

  function onChangeMyValue(event) {
    const {value, checked} = event.target
    let data = value || checked

    if (type === 'date') {
      data = `${new Date(data).getTime()}`
    }

    if (validate(data)) {
      onMyError(false)
      onChange(name, data)
    }
    else {
      onMyError(true)
    }
  }
  
  return (
    <div style={{padding: 10, border: '1px solid gray'}}>
      <label>{title}</label><br/>
      <Component 
        className={className} 
        name={name}
        type={type}
        onChange={onChangeMyValue}/>
      <br/>
      {
        hasError && <span style={{color: 'red'}}>{errorMsg}</span>
      }
    </div>
  )
}

LpField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  validate: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  title: PropTypes.string.isRequired
}

export default LpField