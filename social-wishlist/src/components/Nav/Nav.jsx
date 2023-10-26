import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import "./Nav.css";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";

function Nav() {
	// Este truquito devuelve la primer parte de la URL actual, luego del dominio
	// Ejemplo, si la URL es localhost:5173/login/hola. currentLocation vale 'login'
	const location = useLocation();
	const currentLocation = location.pathname.slice(1).split("/").shift();

	const { user, loggedIn } = useSelector((state) => state.user);

	return (
		<Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation value={currentLocation} className="bottom-navigation">
				<BottomNavigationAction
					component={Link}
					to="/"
					label=""
					value=""
					icon={<HomeIcon />}
					className={`bottom-navigation-action `}
				/>
				<BottomNavigationAction
					component={Link}
					to="/search"
					label=""
					value="search"
					icon={<ExploreIcon />}
					className={`bottom-navigation-action`}
				/>
				<BottomNavigationAction
					component={Link}
					to="/add"
					label=""
					value="add"
					icon={<ControlPointIcon />}
					className={`bottom-navigation-action`}
				/>

				{/* Check for user logged-in in redux */}

				{loggedIn ? (
					<BottomNavigationAction
						component={Link}
						to={`/profile/${user.uid}`}
						label=""
						value="profile"
						icon={<Avatar img={user.photoURL}/>}
						className={`bottom-navigation-action`}
					/>
				) : (
					<BottomNavigationAction
						component={Link}
						to="/login"
						label=""
						value="login"
						icon={<PersonIcon />}
						className={`bottom-navigation-action`}
					/>
				)}
			</BottomNavigation>
		</Paper>
	);
}

export default Nav;
