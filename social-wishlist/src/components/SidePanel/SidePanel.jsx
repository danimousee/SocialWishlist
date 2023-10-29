import { Slide } from '@mui/material'
import React, { useState } from 'react'
import "./SidePanel.css"
import IconButton from '../IconButton/IconButton'
import ClearIcon from "@mui/icons-material/Clear";

function SidePanel({direction = "left", active, children, handleActive}) {

  return (
    <Slide direction={direction} in={active} mountOnEnter unmountOnExit>
        <div className='side-panel'>
            <IconButton className="close-btn" bgColor={'transparent'} onClick={(e) => handleActive(false)}>
                <ClearIcon/>
            </IconButton>
            {children}
        </div>
    </Slide>
  )
}

export default SidePanel