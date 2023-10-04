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
				</div>
				<div className="mid-top-box">

				</div>
				<div className='mid-mid-box'>

				</div>
				<div className='mid-bottom-box'>

				</div>
				<div className='photos-box'>

				</div>

			</div>
		</>
	)
}

export default Profile;
