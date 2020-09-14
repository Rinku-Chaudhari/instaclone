import React from "react";

import "./Backdrop.css";

const Backdrop = (props) => {
	return (
		<div
			className="backdrop"
			style={!props.show ? { display: "none" } : null}
			onClick={props.toggle}
		></div>
	);
};

export default Backdrop;
