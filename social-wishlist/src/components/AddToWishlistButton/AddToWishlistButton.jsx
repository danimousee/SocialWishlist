import React from "react";
import StarIcon from "@mui/icons-material/Star";

const styles = {
    backgroundColor: "#92C789",
	boxShadow: "rgba(0,0,0,0.4) 2px 2px 5px",
    border: "2px solid #518153"
}

function AddToWishlistButton({onClick}) {
	return (
		<button className="home-action-btn" style={styles} onClick={onClick}>
			<StarIcon className="home-action-svg"/>
		</button>
	);
}

export default AddToWishlistButton;
