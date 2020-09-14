import React from "react";
import "./Landingpage.css";

import { Link } from "react-router-dom";

const Landingpage = () => {
	return (
		<div className="landing_page">
			<div className="header">
				<i className="fab fa-instagram"></i>
			</div>

			<div className="buttons">
				<Link to="/login">Login</Link>
				<Link to="/register">Signup</Link>
			</div>
		</div>
	);
};

export default Landingpage;
