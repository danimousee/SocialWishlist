import React from "react";
import ClearIcon from '@mui/icons-material/Clear';

const styles = {
    backgroundColor: "#F8927C",
    boxShadow: "0px 0px 20px #F37272"
}


function SkipProductButton({onClick}) {
	return (
		<button className="home-action-btn" style={styles} onClick={onClick}>
			<ClearIcon className="home-action-svg"/>
		</button>
	);
}

export default SkipProductButton;
