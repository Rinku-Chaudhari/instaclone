import React, { useState, useEffect } from "react";
import "./Viewlikes.css";

import Axios from "axios";
import Nav2 from "../Navbar2/Navbar2";
import Loader from "../Loader/Loader";
import Bottombar from "../Bottombar/Bottombar";

const Viewlikes = (props) => {
  const [likers, setLikers] = useState([]);
  const postId = props.match.params.postId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/post/postLikes/${postId}`
    ).then((res) => {
      setLikers(res.data);
      setLoading(false);
    });
  }, [postId]);

  return (
    <div className="view_likes_page">
      <Nav2 middleText="View Likes" />
      <div className="likers">
        {likers.length > 0 ? (
          likers.map((liker) => {
            return (
              <div
                className="liker"
                key={liker.id}
                style={loading ? { display: "none" } : null}
              >
                <img src={liker.profileimage} alt="profile_pic" />
                <p
                  onClick={() =>
                    props.history.push(`/profile/${liker.username}`)
                  }
                >
                  {liker.username}
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
            No any likes
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

export default Viewlikes;
