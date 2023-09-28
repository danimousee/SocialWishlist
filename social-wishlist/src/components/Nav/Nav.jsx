import React, { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PersonIcon from '@mui/icons-material/Person';
import Paper from "@mui/material/Paper"
import "./Nav.css"

function Nav() {
	const [value, setValue] = useState("recents");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation value={value} onChange={handleChange} className="bottom-navigation">
				<BottomNavigationAction component={Link} to="/" label="" value="home" icon={<HomeIcon />} className={`bottom-navigation-action `} />
				<BottomNavigationAction component={Link} to="/search" label="" value="explore" icon={<ExploreIcon />}  className={`bottom-navigation-action`}/>
				<BottomNavigationAction component={Link} to="/add" label="" value="add" icon={<ControlPointIcon />}  className={`bottom-navigation-action`}/>
				<BottomNavigationAction component={Link} to="/profile" label="" value="profile" icon={<PersonIcon />} className={`bottom-navigation-action`} />
			</BottomNavigation>
		</Paper>
		// <div className="menubar-area style-7 footer-fixed rounded-0">
		// 	<div className="toolbar-inner menubar-nav">
		// 		<Link className="nav-link active" to="/login">
		// 			<i className="fa-solid fa-house"></i>
		// 			<span>Home</span>
		// 		</Link>

		// 		<Link className="nav-link" to="/product-list">
		// 			<i className="fa-solid fa-plus-square"></i>
		// 			<span>Productos</span>
		// 		</Link>

		// 		<Link className="nav-link" to="/detail">
		// 			<i className="fa-solid fa-users"></i>
		// 			<span>Amigos</span>
		// 		</Link>

		// 		<Link className="nav-link" to="/profile">
		// 			<i className="fa-solid fa-user"></i>
		// 			<span>Cuenta</span>
		// 		</Link>
		// 	</div>
		// </div>
	);
}

export default Nav;
