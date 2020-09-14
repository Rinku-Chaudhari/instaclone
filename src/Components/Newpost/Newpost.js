import React, { useState, useContext, useEffect } from "react";
import "./Newpost.css";

import Navbar2 from "../Navbar2/Navbar2";
import Context from "../../Context/Context";
import { Redirect } from "react-router-dom";
import storage from "../../firebase";
import Axios from "axios";

const Newpost = (props) => {
	const [status, setStatus] = useState("");
	const [imageUrl, setImageurl] = useState("");
	const [uploading, setUploading] = useState(false);
	const context = useContext(Context);
	let redirect = context.file === null ? <Redirect to="/" /> : null;

	useEffect(() => {
		let subscribed = true;
		if (context.file !== null && subscribed) {
			setImageurl(URL.createObjectURL(context.file));
		}

		return () => {
			subscribed = false;
		};
	}, [context.file]);

	const uploadPost = (e) => {
		e.preventDefault();
		setUploading(true);

		const uploadedPhoto = storage
			.ref(`posts/${context.currentUser}/${context.file.name}`)
			.put(context.file);
		uploadedPhoto.on(
			"state_changed",
			(snapshot) => {},
			(err) => {
				console.log(err.message);
			},
			() => {
				storage
					.ref(`posts/${context.currentUser}`)
					.child(context.file.name)
					.getDownloadURL()
					.then((url) => {
						Axios.post(
							"https://instaclone111111.herokuapp.com/post/addPost",
							{
								ownerKey: context.userData.id,
								imageURL: url,
								status: status,
								postedDate: new Date(),
							}
						).then((res) => {
							context.setUpdatefeed((prev) => !prev);
							setStatus("");
							context.setFile(null);
							setUploading(false);
							props.history.goBack();
						});
					});
			}
		);
	};

	return (
		<div className="newpost_page">
			<Navbar2
				middleText="Add Post"
				uploadBtn={true}
				uploadFunc={uploadPost}
				uploading={uploading}
			/>
			<div className="add_post">
				<form>
					<input
						type="text"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						placeholder="Type status"
					/>
				</form>
				<div className="square_image">
					<img src={imageUrl} alt="selected_img" />
				</div>
			</div>
			{redirect}
		</div>
	);
};

export default Newpost;
