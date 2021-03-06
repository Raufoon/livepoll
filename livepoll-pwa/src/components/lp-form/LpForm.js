import React, {Children, useRef, useState, useMemo, useEffect, isValidElement} from 'react'
import PropTypes from 'prop-types'

function LpForm(props) {
  const {children, className, onSubmit, submitLabel} = props
  const fieldValues = useRef({})
  const fieldErrors = useRef({})
  const validators = useRef({})
  const [errorCount, setErrorCount] = useState(0)

  const onSubmitThisForm = useMemo(function(){
    return function (event) {
      event.preventDefault()
      onSubmit({...fieldValues.current})
    }
  }, [onSubmit])

  const onChange = useMemo(function() {
    return function(name, value) {
      fieldValues.current[name] = value
    } 
  }, [fieldValues])

  const onError = useMemo(function(){
    return function (name, error) {
      if (!!fieldErrors.current[name] !== error) {
        if (error) setErrorCount(prev => prev + 1)
        else setErrorCount(prev => prev - 1)
        fieldErrors.current[name] = error
      }
    }
  }, [fieldErrors])

  useEffect(function() {
    function calcFormErrorCount() {
      return Object.keys(validators.current).reduce((result, fieldName) => {
        const validator = validators.current[fieldName]
        const isValid = validator(fieldValues.current[fieldName])
        if (isValid) {
          return result
        }
        else {
          fieldErrors.current[fieldName] = true
          return result + 1
        }
      }, 0)
    }

    Children.forEach(children, element => {
      if (!isValidElement(element)) return
      const {name, defaultValue} = element.props
      fieldValues.current[name] = defaultValue
      validators.current[name] = element.props.validate || (() => true)
    })

    setErrorCount(calcFormErrorCount())
  }, [children])

  return (
    <form className={className} onSubmit={onSubmitThisForm}>
      {
        Children.map(children, element => {
          return React.cloneElement(element, {onChange, onError})
        })
      }
      {errorCount === 0 && <input type='submit' value={submitLabel}/>}
    </form>
  )
}

LpForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired
}

export default LpForm