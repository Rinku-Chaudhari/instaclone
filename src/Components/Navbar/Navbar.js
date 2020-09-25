import React, { useContext } from "react";
import "./Navbar.css";

import Context from "../../Context/Context";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {
	const context = useContext(Context);

	const updateFile = (e) => {
		if (e.target.files[0]) {
			context.setFile(e.target.files[0]);
			props.history.push("/newpost");
		}
	};

	const logout = () => {
		localStorage.setItem("userId", "");
		props.history.push("/");
	};

	return (
		<div className="navbar">
			<div className="branding">
				<Link to="/">
					<i className="fab fa-instagram"></i>
				</Link>
			</div>

			<div
				className="actions"
				style={
					context.userData.id === undefined
						? { display: "none" }
						: null
				}
			>
				<button>
					<form className="image_form">
						<input
							type="file"
							onChange={updateFile}
							id="file"
							accept="image/*"
						/>
						<label htmlFor="file">
							<AddIcon />
						</label>
					</form>
				</button>
				<button onClick={() => props.history.push(`/explore`)}>
					<SearchIcon />
				</button>
				<button onClick={() => props.history.push(`/notifications`)}>
					<NotificationsIcon
						style={context.unseen ? { color: "red" } : null}
					/>
				</button>
				<button
					onClick={() =>
						props.history.push(`/profile/${context.currentUser}`)
					}
				>
					<img
						src={context.userData.profileimage}
						alt="profile_pic"
					/>
				</button>
				<button onClick={() => props.history.push(`/`)}>
					<ArrowForwardIcon onClick={logout} />
				</button>
			</div>

			<div
				className="auth_btn"
				style={
					context.userData.id !== undefined
						? { display: "none" }
						: null
				}
			>
				<button onClick={() => props.history.push(`/login`)}>
					Login
				</button>
				<button onClick={() => props.history.push(`/register`)}>
					Signup
				</button>
			</div>

			<button onClick={logout} className="logout-btn">
				logout
			</button>
		</div>
	);
};

export default withRouter(Navbar);
