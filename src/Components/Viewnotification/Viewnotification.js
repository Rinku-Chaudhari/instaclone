import React from "react";

import "./Viewnotification.css";
import Timecalculator from "../../Timedifference/Timediffcalculator";
import { withRouter } from "react-router-dom";

const Notification = ({
    username,
    interactorId,
    profileImage,
    userImage,
    notification,
    postImage,
    date,
    id,
    seen,
    history,
    postId,
}) => {
    const time = Timecalculator(date, true);
    return (
        <div style={{ width: "100%" }}>
            <div
                className="notification"
                onClick={() =>
                    postId !== null
                        ? history.push(`/viewPost/${postId}`)
                        : notification === "follow"
                        ? history.push(`/profile/${username}`)
                        : ""
                }
            >
                <div className="left">
                    <img
                        src={profileImage}
                        alt="profile-pc"
                        className="profile-pic"
                    />
                    <p style={!seen ? { color: "skyblue" } : null}>
                        {username}{" "}
                        {notification === "like post"
                            ? " liked your post."
                            : notification === "like comment"
                            ? " liked your comment."
                            : notification === "comment added"
                            ? " commented on your post."
                            : notification === "follow"
                            ? "started following you."
                            : ""}
                        <b style={{ color: "grey" }}>{time}</b>
                    </p>
                </div>
                <img
                    style={postImage === null ? { display: "none" } : null}
                    src={postImage}
                    alt="profile-pc"
                    className="post-img"
                />
            </div>
        </div>
    );
};

export default withRouter(Notification);
