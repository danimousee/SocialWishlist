import { useState } from 'react'
import avatar from './../../img/avatar.jpg'
import "./Profile.css"



const Profile = () => {
	const [tab, setTab] = useState("profile");
	
	return (
		<>
			<div className="main-box">
				<div className="top-box">
					<div className="username">
						<h1>Username Here</h1>
					</div>
					<div className="configIcon">

					</div>
				</div>
				<div className="mid-top-box">
					<div className='profilePicSection'>
						<img src="Images/Dani.png" alt="IMAGEN"></img>
					</div>
					<div className='profileInfoSection'>

					</div>
				</div>
				<div className='mid-mid-box'>
					<div className='editProfileSection'>
						<button type="button">Edit Profile</button>
					</div>
					<div className='shareProfileSection'>
						<button type="button">Share Profile</button>
					</div>
				</div>
				<div className='mid-bottom-box'>
					<div className='wishes'>
						<button type='button'>Wishes</button>
					</div>
					<div className='cart'>
						<button type='Cart'>Cart</button>
					</div>
				</div>
				<div className='photos-box'>

				</div>

			</div>
		</>
	)
}

export default Profile;
