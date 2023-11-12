import React from 'react'
import { Link } from 'react-router-dom'
import "./SuccessComponent.css"
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate, useParams } from "react-router-dom";
import router from '../../router/router';

const SuccessComponent = ({productId = ""}) => {
  console.log("SuccessComponent ~ productId:", productId);
  const navigate = useNavigate();

  const handleGoTo = () => {
    //Aca deberia llevarme al producto agregado
    navigate(`/product/${productId}`);
  }


  return (
    <>
    <div className='main-success-screen'>
        <div className='success-icon-div'>
            <CheckCircleRoundedIcon className='success-icon'></CheckCircleRoundedIcon>
        </div>
        <div className='success-text-div'>
            <h3 className='sucess-text'>Congratulations!</h3>
        </div>
        <div className='watch-button-div'>
            <button className='watch-button' onClick={handleGoTo}>Go to product!</button>
        </div>
    </div>
    </>
  )
}


export default SuccessComponent;