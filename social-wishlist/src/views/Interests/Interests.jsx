import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import './Interests.css'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getUser } from "../../firebase/queries/users";
import { db } from "../../firebase";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';

const Interests = () => {
	let { user_id } = useParams();

	const dispatch = useDispatch();
	// const { user, loggedIn } = useSelector((state) => state.user);

	const navigate = useNavigate();
	
    const selectButton = (event) => {
        const clickedButton = event.target;
        // Si el botón ya tiene la clase 'selected', remuévela
        if (clickedButton.classList.contains('interests-button-selected')) {
            clickedButton.classList.remove('interests-button-selected');
        }
        // Si el botón no tiene la clase 'selected', añádela
        else {
            clickedButton.classList.add('interests-button-selected');
        }
        
    }

	return (
		<>
            <div className="interests-main">
                <div className="div-nav">
                    <div className="div-back-icon">
                        <ArrowBackIosNewIcon className="icon"/>
                    </div>
                    <div className="div-search-icon">
                        <SearchIcon className="icon"/>
                    </div>
                </div>
                <div className="title-topbox">
                    <div className="div-title">
                        <h1 className="title-topbox-title">What are you interested in?</h1>
                    </div>
                    <div className="div-description">
                    <h2 className="title-topbox-description">Choose at least 3 interests</h2>
                    </div>
                </div>
                <div className="div-interests">
                    <div className="div-interest-column">
                        <button className="interests-button" onClick={selectButton}>Cars</button>
                        <button className="interests-button" onClick={selectButton}>Technology</button>
                        <button className="interests-button" onClick={selectButton}>Travel</button>
                    </div>
                    <div className="div-interest-column">
                        <button className="interests-button" onClick={selectButton}>Toys</button>
                        <button className="interests-button" onClick={selectButton}>Sports</button>
                    </div>
                    <div className="div-interest-column">
                        <button className="interests-button" onClick={selectButton}>Games</button>
                        <button className="interests-button" onClick={selectButton}>Clothes</button>
                        <button className="interests-button" onClick={selectButton}>Food</button>
                    </div>
                    <div className="div-interest-column">
                        <button className="interests-button" onClick={selectButton}>Beauty</button>
                        <button className="interests-button" onClick={selectButton}>Home</button>
                    </div>
                </div>
                <div className="div-bottom-section">
                    <button className="save-info-button">Next</button>
                </div>
            </div>
		</>
	);

}

export default Interests;
