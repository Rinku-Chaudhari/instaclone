import React, { useState } from "react";

import Axios from "axios";
import "./Signup.css";

const Signup = (props) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const Register = (e) => {
		setLoading(true);
		e.preventDefault();
		Axios.post("https://instaclone111111.herokuapp.com/auth/registerUser", {
			email,
			username,
			password,
		}).then((res) => {
			setLoading(false);
			if (res.data === "done") {
				props.history.push("/login");
			} else {
				setError(res.data);
			}
		});
	};

	const onChangeHandler = (e, handlerName) => {
		setError("");
		handlerName(e.target.value);
	};

	return (
		<div className="signup_page">
			<form onSubmit={Register}>
				<i className="fab fa-instagram"></i>
				<input
					type="email"
					value={email}
					onChange={(e) => onChangeHandler(e, setEmail)}
					placeholder="Type your email"
				/>
				<input
					type="text"
					value={username}
					onChange={(e) => onChangeHandler(e, setUsername)}
					placeholder="Set your username"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => onChangeHandler(e, setPassword)}
					placeholder="Set your password"
				/>
				<button type="submit">{loading ? "..." : "Register"}</button>
				<p className="error_view">{error}</p>
			</form>
		</div>
	);
};

export default Signup;
