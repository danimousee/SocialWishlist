import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function FullScreenLoader({color = "secondary"}) {
	return (
		<Box
			sx={{
				display: "flex",
                minHeight: "100vh",
                alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress color={color} />
		</Box>
	);
}

export default FullScreenLoader;
