import React, { useState, useEffect } from "react";
import "./Viewcommentlikes.css";

import Axios from "axios";
import Nav2 from "../Navbar2/Navbar2";
import Bottombar from "../Bottombar/Bottombar";
import Loader from "../Loader/Loader";

const Viewcommentlikes = (props) => {
  const [likers, setLikers] = useState([]);
  const [loading, setLoading] = useState(true);
  const commentId = props.match.params.commentId;

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/comment/commentLikes/${commentId}`
    ).then((res) => {
      setLikers(res.data);
      setLoading(false);
    });
  }, [commentId]);

  return (
    <div className="view_likes_page">
      <Nav2 middleText="View Comment Likes" />
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

export default Viewcommentlikes;
