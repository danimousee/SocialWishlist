import { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '../../components/Avatar/Avatar';
import "./Profile.css"
import PersonIcon from "@mui/icons-material/Person";


const Profile = () => {
	const location = useLocation();
	const currentLocation = location.pathname.slice(1).split("/").shift();

	const { user, loggedIn } = useSelector((state) => state.user);
	
	return (
		<>
			<div className='profile-main'>
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
