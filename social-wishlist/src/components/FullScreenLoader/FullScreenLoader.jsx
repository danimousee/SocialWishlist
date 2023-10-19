import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function FullScreenLoader() {
	return (
		<Box
			sx={{
				display: "flex",
                minHeight: "100vh",
                alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress color="secondary" />
		</Box>
	);
}

export default FullScreenLoader;
