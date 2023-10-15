import { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../components/Avatar/Avatar';
import "./Profile.css"
import LogoutIcon from '@mui/icons-material/Logout';

import { googleSignOut } from "../../firebase/auth/googleAuth";
import { userLogOut } from "../../actions/user";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";



const Profile = () => {
	const dispatch = useDispatch();

	const location = useLocation();
	const currentLocation = location.pathname.slice(1).split("/").shift();

	const { user, loggedIn } = useSelector((state) => state.user);
	
	const navigate = useNavigate();
	const handleSignOut = function () {
		googleSignOut().then((res) => {
			dispatch(userLogOut());
			navigate("/login");
		});
	};

	return (
		<>
			<div className='profile-main'>
				<div className='log-out-user'>
					<button className='log-out-button' onClick={handleSignOut}><LogoutIcon className='log-out-icon'/></button>
				</div>
				{/* Profile Card Section*/}
				<div className='p-card'>
						<div className='friends-counter'>
							<h2>Friends</h2>
						</div>
						<div className='prof-picture'>
							{<Avatar img={user.photoURL} />}
						</div>
						<div className='wishes-counter'>
							<h2>Wishes</h2>
						</div>	
				</div>
				{/* Photos Section */}
				<div className='p-photos'>
					<div className='tab-selector'>
						<div className='wishes'>
							<h2>Wishes</h2>
						</div>
						<div className='cart'>
							<h2>Cart</h2>
						</div>
					</div>
					<h1>Fotitos</h1>
				</div>
			</div>
		</>
	)
}

export default Profile;
