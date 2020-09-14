import React, { useState } from "react";
import "./Login.css";

import Axios from "axios";

const Login = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const Signin = (e) => {
		setLoading(true);
		e.preventDefault();
		Axios.post("https://instaclone111111.herokuapp.com/auth/loginUser", {
			username,
			password,
		}).then((res) => {
			setLoading(false);
			if (res.data.done) {
				localStorage.setItem("userId", res.data.id);
				props.history.push("/");
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
		<div className="login_page">
			<form onSubmit={Signin}>
				<i className="fab fa-instagram"></i>
				<input
					type="text"
					value={username}
					onChange={(e) => onChangeHandler(e, setUsername)}
					placeholder="Type your username"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => onChangeHandler(e, setPassword)}
					placeholder="Type your password"
				/>
				<button type="submit" className={loading ? "loading" : ""}>
					{loading ? "..." : "Login"}
				</button>
				<p className="error_view">{error}</p>
			</form>
		</div>
	);
};

export default Login;
