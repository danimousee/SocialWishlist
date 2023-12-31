import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import './Interests.css'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getUser } from "../../firebase/queries/users";
import { db } from "../../firebase";
import Profile from "../profile/Profile";

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { addInterestToUser } from "../../firebase/queries/interests";
import { deleteInterestOfUser } from "../../firebase/queries/interests";
import { getUserInterests } from "../../firebase/queries/interests";



const Interests = () => {
    let { user_id } = useParams();
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const { user, loggedIn } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [selectedButtons, setSelectedButtons] = useState([]);


    //Ejecuta una vez que la pantalla fue cargada
    useEffect(() => {
        if (user && user.uid) {

            //obtiene los intereses del usuario loggeado
            getUserInterests(user.uid)
                .then((interests) => {
                    //console.log(interests);

                    //Actualiza la variable count con los intereses actuales
                    setCount(interests.length)

                    //para cada interes del usuario lo marca como seleccionado
                    interests.forEach((interest) => {
                        checkAndSelectButton(interests, interest.id, interest.id);
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user interests:", error);
                });
        }
    }, [user]);

    //funcion que marca el interes si lo tiene el usuario
    const checkAndSelectButton = (interests, interestId, buttonId) => {
        const isInterestPresent = interests.some((interest) => interest.id === interestId);
        //console.log(isInterestPresent);

        //obtiene el button correspondiente por ID
        const interestButton = document.getElementById(buttonId);
        if (isInterestPresent) {
            //cambia el estilo a seleccionado del boton
            interestButton.classList.add("interests-button-selected");
            setSelectedButtons([...selectedButtons, interestId]);
        }
    };

    const selectButton = (event) => {
        const clickedButton = event.target;
        const interestId = clickedButton.id;
        // Si el botón ya tiene la clase 'selected', remuévela
        if (clickedButton.classList.contains('interests-button-selected')) {
            clickedButton.classList.remove('interests-button-selected');
            setCount(count - 1);
            handleDeleteInterest(interestId);
        }
        // Si el botón no tiene la clase 'selected', añádela
        else {
            clickedButton.classList.add('interests-button-selected');
            setCount(count + 1);
            handleAddToInterests(interestId);

        }

    }

    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const onClickNext = (event) => {
        if (count >= 3) {
            navigate('/');
        } else {
            setErrorMessage("You must choose at least 3 Interests.");
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        }
    }

    const onClickSkip = () => {
        navigate('/');
    }

    const onClickBack = () => {
        navigate(-1);
    }

    //const { interests, loading, page } = useSelector((state) => state.interests);
    const handleAddToInterests = async (interestId) => {
        if (loggedIn && user?.uid) {
            try {
                const payload = { id: interestId }; // Assuming the `id` is the interestName
                await addInterestToUser(db, payload, user.uid);
            } catch (error) {
                console.error('Error adding to interests:', error);
            }
        }
    }

    const handleDeleteInterest = async (interestId) => {
        if (loggedIn && user?.uid) {
            try {
                await deleteInterestOfUser(db, interestId, user.uid);
            } catch (error) {
                console.error('Error adding to interests:', error);
            }
        }
    }

    return (
        <>
            <div className="interests-main">
                <div className="div-nav">
                    <div className="div-back-icon">
                        <ArrowBackIosNewRoundedIcon className="icon" onClick={onClickBack} />
                    </div>
                    <div className="div-skip-icon">
                        <CloseRoundedIcon className="icon" onClick={onClickSkip}></CloseRoundedIcon>
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
                        <button className="interests-button" onClick={selectButton} id="cars">Cars</button>
                        <button className="interests-button" onClick={selectButton} id="technology">Technology</button>
                        <button className="interests-button" onClick={selectButton} id="travel">Travel</button>
                    </div>
                    <div className="div-interest-column">
                        <button className="interests-button" onClick={selectButton} id="toys">Toys</button>
                        <button className="interests-button" onClick={selectButton} id="sports">Sports</button>
                    </div>
                    <div className="div-interest-column">
                        <button className="interests-button" onClick={selectButton} id="games">Games</button>
                        <button className="interests-button" onClick={selectButton} id="clothes">Clothes</button>
                        <button className="interests-button" onClick={selectButton} id="food">Food</button>
                    </div>
                    <div className="div-interest-column">
                        <button className="interests-button" onClick={selectButton} id="beauty">Beauty</button>
                        <button className="interests-button" onClick={selectButton} id="home">Home</button>
                    </div>
                </div>
                <div className="div-bottom-section">
                    <p className={`error-message-next ${isVisible ? 'visible' : ''}`}>{errorMessage}</p>
                    <button className="save-info-button" onClick={onClickNext}>Next</button>
                </div>
            </div>
        </>
    );

}

export default Interests;
