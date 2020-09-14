import React, { useState, useEffect } from "react";
import "./Viewfollowers.css";

import Axios from "axios";
import Navbar2 from "../Navbar2/Navbar2";
import Loader from "../Loader/Loader";
import Bottombar from "../Bottombar/Bottombar";

const Viewfollowers = (props) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/userInfo/getFollowers/${props.match.params.userId}`
    ).then((res) => {
      setFollowers(res.data);
      setLoading(false);
    });
  }, [props]);
  return (
    <div className="view_followers">
      <Navbar2 middleText="Followers" />
      <div className="followers">
        {followers.length > 0 ? (
          followers.map((follower) => {
            return (
              <div
                className="follower"
                key={follower.id}
                style={loading ? { display: "none" } : null}
              >
                <img src={follower.profileimage} alt="profile_pic" />
                <p
                  onClick={() =>
                    props.history.push(`/profile/${follower.username}`)
                  }
                >
                  {follower.username}
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
            No any followers
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

export default Viewfollowers;
