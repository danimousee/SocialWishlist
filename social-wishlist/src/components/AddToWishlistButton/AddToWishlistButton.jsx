import React from "react";
import StarIcon from "@mui/icons-material/Star";

const styles = {
    backgroundColor: "#92C789",
    boxShadow: "0px 0px 20px #81F26F"
}

function AddToWishlistButton({onClick}) {
	return (
		<button className="home-action-btn" style={styles} onClick={onClick}>
			<StarIcon className="home-action-svg"/>
		</button>
	);
}

export default AddToWishlistButton;
