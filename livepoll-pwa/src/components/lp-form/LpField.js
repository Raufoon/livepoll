import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './style.css'

function LpField(props) {
  const {Component, className, onChange, onError} = props
  const {type, name, validate, errorMsg, title} = props
  const {options, defaultValue} = props
  const [hasError, setError] = useState(false)

  function onMyError(shouldErr = true) {
    setError(shouldErr)
    onError(name, shouldErr)
  }

  function onChangeMyValue(event) {
    const {value, checked} = event.target
    let data = type === 'checkbox' ? checked: value

    if (type === 'date' || type === 'datetime-local') {
      data = `${new Date(data).getTime()}`
    }

    if (!validate || validate(data)) {
      onMyError(false)
      onChange(name, data)
    }
    else {
      onMyError(true)
    }
  }

  if (type === 'checkbox') return (
    <div className={`LpField ${className} checkbox`}>
      <input
        type='checkbox'
        onChange={onChangeMyValue}
        defaultChecked={defaultValue}/>
      <label>{title}</label>
    </div>
  )

  if (Component === 'select') return (
    <div className={`LpField ${className}`}>
      <label>{title}</label><br/>
      <Component 
        name={name}
        type={type}
        defaultValue={defaultValue}
        onChange={onChangeMyValue}>
          {
            options.map(opt => {
              const {name, value} = opt
              return <option key={value} value={value}>
                {name}
              </option>
            })
          }
      </Component>
    </div>
  )
  
  return (
    <div className={`LpField ${className}`}>
      <label>{title}</label><br/>
      <Component 
        name={name}
        type={type}
        defaultValue={defaultValue}
        onChange={onChangeMyValue}/>
      <br/>
      {
        hasError && <span style={{color: 'red'}}>{errorMsg || 'this is invalid'}</span>
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
  validate: PropTypes.func,
  errorMsg: PropTypes.string,
  defaultValue: PropTypes.any,
  title: PropTypes.string.isRequired,
  options: PropTypes.array
}

export default LpField