import React from 'react'
import './IconButton.css'

// Encapsulate styles here
// This component needs an SVG and an onClick handler function
// Configurable background color
function IconButton({ children, onClick, bgColor, customSize, className, disabled }) {
    const styles = {
        backgroundColor: bgColor,
        width: customSize,
        height: customSize,
    }

  return (
    <button style={styles} className={'icon-btn ' + className} disabled={disabled} onClick={onClick}>{children}</button>
  )
}

export default IconButton