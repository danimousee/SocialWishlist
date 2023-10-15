import React from "react";
import userIcon from "../../img/icon-user_white.svg";

function Avatar({ img }) {
	const avatar = img || userIcon;
	

	const styles = {
		backgroundImage: `url(${avatar})`,
		backgroundPosition: "center center",
		backgroundSize: "cover",
		backgroundColor: "var(--primary)",
		// height: "23px", LO SACO DE ACA, LO PONGO EN EL NAV, Sino no puedo modificar imagen de mi perfil.
		aspectRatio: "1",
		borderRadius: '50%',
		border: "1px solid grey",
	};

	return <div style={styles} className="avatar"></div>;
}

export default Avatar;
