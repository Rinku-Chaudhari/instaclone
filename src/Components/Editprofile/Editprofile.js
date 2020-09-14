import React, { useContext, useState } from "react";
import "./Editprofile.css";

import Context from "../../Context/Context";
import Navbar2 from "../Navbar2/Navbar2";
import storage from "../../firebase";
import Axios from "axios";

const Editprofile = (props) => {
	const context = useContext(Context);
	const [username, setUsername] = useState("");
	const [middleText, setMiddletext] = useState("Edit Profile");
	const [error, setError] = useState("");
	const [Bio, setBio] = useState("");
	const [image, setImage] = useState(null);

	const fileChangeHandler = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const updateUsernameAndBio = (e) => {
		e.preventDefault();

		if (username.trim() === "" && Bio.trim() === "") {
			setError("Nothing to update");
		} else {
			setMiddletext("Updating...");
			Axios.post(
				`https://instaclone111111.herokuapp.com/userInfo/updateUsernameAndBio/${context.currentUser}`,
				{
					username: username !== "" ? username : context.currentUser,
					bio: Bio !== "" ? Bio : context.userData.bio,
					initialUsername: context.currentUser,
				}
			).then((res) => {
				setMiddletext("Update Profile");
				if (res.data !== "done") {
					setError(res.data);
				}
				if (res.data === "done") {
					props.history.push(
						`/profile/${
							username !== "" ? username : context.currentUser
						}`
					);
					context.setUpdatefeed((prev) => !prev);
					context.setCurrentuser(
						username !== "" ? username : context.currentUser
					);
				}
			});
		}
	};

	const updateProfilepic = (e) => {
		setMiddletext("Updating...");
		e.preventDefault();
		if (image !== null) {
			const uploadImage = storage
				.ref(`profilePics/${context.currentUser}`)
				.put(image);
			uploadImage.on(
				"state_changed",
				(snapshot) => {},
				() => {},
				() => {
					storage
						.ref("profilePics")
						.child(context.currentUser)
						.getDownloadURL()
						.then((url) => {
							Axios.post(
								`https://instaclone111111.herokuapp.com/userInfo/updateProfilePic/${context.currentUser}`,
								{
									profileImage: url,
								}
							).then((res) => {
								if (res.data === "done") {
									setMiddletext("Update Profile");
									setImage(null);
									context.setUpdatefeed((prev) => !prev);
									props.history.push(
										`/profile/${context.currentUser}`
									);
								}
							});
						});
				}
			);
		}
	};

	const onChangeHandler = (e, mode) => {
		mode(e.target.value);
		setError("");
	};

	return (
		<div className="edit_profile">
			<Navbar2 middleText={middleText} />
			<div className="edit_username">
				<form onSubmit={updateUsernameAndBio}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => onChangeHandler(e, setUsername)}
						placeholder={context.currentUser}
					/>
					<label htmlFor="bio">Bio</label>
					<textarea
						id="bio"
						value={Bio}
						onChange={(e) => onChangeHandler(e, setBio)}
						placeholder={context.userData.bio}
					/>
					<p className="error_view">{error}</p>
					<input type="submit" value="Submit" />
				</form>
			</div>

			<div className="edit_profilepic">
				<form onSubmit={updateProfilepic}>
					<input id="file" type="file" onChange={fileChangeHandler} />
					<label htmlFor="file">
						{image !== null ? image.name : "Choose image"}
					</label>
					<input type="submit" value="Update Profile image" />
				</form>
			</div>
		</div>
	);
};

export default Editprofile;
