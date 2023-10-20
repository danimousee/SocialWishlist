import React from "react";
import ClearIcon from '@mui/icons-material/Clear';

const styles = {
    backgroundColor: "#F8927C",
	boxShadow: "rgba(0,0,0,0.4) 2px 2px 5px",
    border: "2px solid #954a48"
}


function SkipProductButton({onClick}) {
	return (
		<button className="home-action-btn" style={styles} onClick={onClick}>
			<ClearIcon className="home-action-svg"/>
		</button>
	);
}

export default SkipProductButton;
