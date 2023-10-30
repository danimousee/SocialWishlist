import React from "react";
import "./UserBrick.css";
import IconButton from "../IconButton/IconButton";
import { Link } from "react-router-dom";

/*
action = {
    bgColor: String,
    icon: SVGComponent,
    onClick: function
}
*/

function UserBrick({ user = {}, actions = [], disableActions }) {
	return (
		<div className="user-preview">
			<Link to={`/profile/${user.uid}`}>
				<div style={{ display: "flex" }}>
					<img src={user.photoURL} />
					<p>{user.displayName}</p>
				</div>
			</Link>
			<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
				{actions.map((action, i) => (
					<IconButton key={i} customSize={"30px"} bgColor={action.bgColor} onClick={(e) => action.onClick(e, user)} disabled={disableActions}>
						{action.icon}
					</IconButton>
				))}
			</div>
		</div>
	);
}

export default UserBrick;
