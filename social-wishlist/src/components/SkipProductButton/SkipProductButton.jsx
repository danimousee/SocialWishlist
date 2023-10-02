import React from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const styles = {
    backgroundColor: "#F8927C",
    boxShadow: "0px 0px 20px #F37272"
}


function SkipProductButton({onClick}) {
	return (
		<button className="home-action-btn" style={styles} onClick={onClick}>
			<SkipNextIcon className="home-action-svg"/>
		</button>
	);
}

export default SkipProductButton;
