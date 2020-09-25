import React from "react";
import "./Profileinfo.css";

import { withRouter } from "react-router-dom";

const Profileinfo = ({
  context,
  profileInfo,
  posts,
  history,
  followUnfollow,
  followedByMe,
  followers,
}) => {
  let button = "";

  if (profileInfo.id === context.userData.id) {
    button = (
      <button
        onClick={() => history.push(`/editprofile`)}
        className="edit_btn"
        style={
          profileInfo.id !== context.userData.id ? { display: "none" } : null
        }
      >
        Edit Profile
      </button>
    );
  } else {
    button = (
      <div className="followBtn">
        <button
          onClick={followUnfollow}
          className="follow_btn"
          style={followedByMe ? { display: "none" } : null}
        >
          Follow
        </button>
        <button
          onClick={followUnfollow}
          className="unfollow_btn"
          style={!followedByMe ? { display: "none" } : null}
        >
          Unfollow
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="profile_infoo">
        <div className="image_div">
          <img src={profileInfo.profileimage} alt="profile_img" />
        </div>

        <div className="right_div">
          <div className="line1">
            <p>{profileInfo.username}</p>
            {button}
          </div>

          <div className="line2">
            <p>
              <b>{posts}</b> posts
            </p>
            <p onClick={() => history.push(`/followers/${profileInfo.id}`)}>
              <b>{followers === null ? 0 : followers} </b>
              followers
            </p>
            <p onClick={() => history.push(`/followings/${profileInfo.id}`)}>
              <b>
                {profileInfo.following === null ? 0 : profileInfo.following}{" "}
              </b>
              following
            </p>
          </div>

          <div className="line3">{profileInfo.bio}</div>
        </div>
      </div>

      <div className="profile_infoo2">
        <div className="image_div">
          <img src={profileInfo.profileimage} alt="profile_img" />

          <div className="line1">
            <p>{profileInfo.username}</p>
            {button}
          </div>
        </div>

        <div className="right_div">
          <div className="line3">{profileInfo.bio}</div>

          <div className="line2">
            <p>
              <b>{posts}</b> posts
            </p>
            <p onClick={() => history.push(`/followers/${profileInfo.id}`)}>
              <b>{followers === null ? 0 : followers} </b>
              followers
            </p>
            <p onClick={() => history.push(`/followings/${profileInfo.id}`)}>
              <b>
                {profileInfo.following === null ? 0 : profileInfo.following}{" "}
              </b>
              following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profileinfo);
