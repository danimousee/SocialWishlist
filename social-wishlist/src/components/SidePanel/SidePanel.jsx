import { Slide } from '@mui/material'
import React, { useState } from 'react'
import "./SidePanel.css"
import IconButton from '../IconButton/IconButton'
import ClearIcon from "@mui/icons-material/Clear";

function SidePanel({direction = "left", active, children, handleClose}) {

  return (
    <Slide direction={direction} in={active} mountOnEnter unmountOnExit>
        <div className='side-panel'>
            <IconButton className="close-btn" bgColor={'transparent'} onClick={handleClose}>
                <ClearIcon/>
            </IconButton>
            {children}
        </div>
    </Slide>
  )
}

export default SidePanel