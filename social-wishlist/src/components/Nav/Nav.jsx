import React from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<div className="menubar-area style-7 footer-fixed rounded-0">
			<div className="toolbar-inner menubar-nav">
        <Link className="nav-link active" to="/login">
					<i className="fa-solid fa-house"></i>
					<span>Home</span>
        </Link>
				{/* <a href="/SocialWishlist/Login" className="nav-link active"> */}
				{/* </a> */}
        <Link className="nav-link" to="/product-list">
          <i className="fa-solid fa-plus-square"></i>
					<span>Productos</span>
        </Link>

        <Link className="nav-link" to="/detail">
        <i className="fa-solid fa-users"></i>
					<span>Amigos</span>
        </Link>

        <Link className="nav-link" to="/profile">
        <i className="fa-solid fa-user"></i>
					<span>Cuenta</span>
        </Link>
					
			</div>
		</div>
	);
}

export default Nav;
