import React from "react";
import "./Navbar2.css";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { withRouter } from "react-router-dom";

const Navbar2 = ({ history, middleText, uploadFunc, uploadBtn, uploading }) => {
	return (
		<div className="navbar2">
			<button onClick={() => history.goBack()}>
				<ArrowBackIosIcon />
			</button>
			<h5>{uploading ? "Uploading...." : middleText}</h5>
			<button
				onClick={uploadFunc}
				style={!uploadBtn ? { display: "none" } : null}
				disabled={uploading}
			>
				upload
			</button>
		</div>
	);
};

export default withRouter(Navbar2);
