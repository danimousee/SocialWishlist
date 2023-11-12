import React from 'react'
import { Link } from 'react-router-dom'
import "./FailComponent.css"
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const FailComponent = () => {
  return (
    <>
    <div className='main-fail-screen'>
        <div className='fail-icon-div'>
            <CancelRoundedIcon className='fail-icon'></CancelRoundedIcon>
        </div>
        <div className='fail-text-div'>
            <h3 className='fail-text'>Sorry, there has been a problem!</h3>
        </div>
    </div>
    </>
  )
}


export default FailComponent;