import React, { useState, useEffect } from "react";
import "./Viewfollowing.css";

import Axios from "axios";
import Navbar2 from "../Navbar2/Navbar2";
import Loader from "../Loader/Loader";
import Bottombar from "../Bottombar/Bottombar";

const Viewfollowing = (props) => {
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/userInfo/getFollowings/${props.match.params.userId}`
    ).then((res) => {
      setFollowings(res.data);
      setLoading(false);
    });
  }, [props]);
  return (
    <div className="view_followings">
      <Navbar2 middleText="Followings" />
      <div className="followings">
        {followings.length > 0 ? (
          followings.map((following) => {
            return (
              <div
                className="following"
                key={following.id}
                style={loading ? { display: "none" } : null}
              >
                <img src={following.profileimage} alt="profile_pic" />
                <p
                  onClick={() =>
                    props.history.push(`/profile/${following.username}`)
                  }
                >
                  {following.username}
                </p>
              </div>
            );
          })
        ) : (
          <p
            style={
              loading
                ? { display: "none" }
                : { textAlign: "center", fontSize: "14px" }
            }
          >
            No any following
          </p>
        )}
        <div
          className="loader_vl"
          style={!loading ? { display: "none" } : null}
        >
          <Loader />
        </div>
      </div>
      <Bottombar />
    </div>
  );
};

export default Viewfollowing;
