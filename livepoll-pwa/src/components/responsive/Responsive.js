import React, {useEffect, useState, useMemo} from 'react'
import PropTypes from 'prop-types'

function getScreenWidth() {
  const {innerWidth} = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const width = innerWidth || e.clientWidth || g.clientWidth
  return width
}

export default function Responsive(props) {
  const {screens, minWidth, children} = props
  const [width, setWidth] = useState(getScreenWidth)
    
  useEffect(function effect() {
    function onResize() {
      setWidth(getScreenWidth())
    }

    window.addEventListener('resize', onResize)

    return function cancel() {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (minWidth) {
    if (width >= minWidth) return <>{children}</>
    else return false;
  }

  return (screens.indexOf('S') !== -1 && width < 800 && <>{children}</>)
    || (screens.indexOf('M') !== -1 && width >= 800 && width < 1500 && <>{children}</>)
    || (screens.indexOf('L') !== -1 && width >= 1500 && <>{children}</>)
}

Responsive.propTypes = {
  screens: PropTypes.arrayOf(PropTypes.oneOf(['S', 'M', 'L'])),
  minWidth: PropTypes.number
}
