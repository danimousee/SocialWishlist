import React from "react";
import userIcon from "../../img/icon-user_white.svg";

function Avatar({ img }) {
	const avatar = img || userIcon;
	

	const styles = {
		backgroundImage: `url(${avatar})`,
		backgroundPosition: "center center",
		backgroundSize: "cover",
		backgroundColor: "var(--primary)",
		height: "23px",
		aspectRatio: "1",
		borderRadius: "24px",
		border: "1px solid grey",
	};

	return <div style={styles} className="avatar"></div>;
}

export default Avatar;
