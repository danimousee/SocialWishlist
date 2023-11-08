import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const styles = {
    backgroundColor: "#92C789",
	boxShadow: "rgba(0,0,0,0.4) 2px 2px 5px",
    border: "2px solid #518153"
}

function AddToCartButton({onClick}) {
	return (
		<button className="home-action-btn" style={styles} onClick={onClick}>
			<ShoppingCartIcon className="home-action-svg"/>
		</button>
	);
}

export default AddToCartButton;
