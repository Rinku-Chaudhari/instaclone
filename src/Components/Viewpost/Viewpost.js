import React, { useState, useEffect } from "react";

import "./Viewpost.css";

import Bottombar from "../Bottombar/Bottombar";
import Post from "../Post/Post";
import Axios from "axios";
import Navbar2 from "../Navbar2/Navbar2";
import Loader from "../Loader/Loader";

const Viewpost = (props) => {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/post/getSelectedPost/${postId}`
    ).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  }, [postId]);

  return (
    <div className="viewpost">
      <Navbar2 middleText="Post" />

      <div className="post-view" style={loading ? { display: "none" } : null}>
        {post.postid !== undefined ? (
          <Post
            key={post.postid}
            postId={post.postid}
            username={post.username}
            postImage={post.postimage}
            status={post.status}
            postedDate={post.posteddate}
            userImage={post.profileimage}
            userId={post.userid}
            likesCount={post.likers}
          />
        ) : (
          <p
            style={
              loading
                ? { display: "none" }
                : { textAlign: "center", fontSize: "16px" }
            }
          >
            Post not found
          </p>
        )}
      </div>
      <div
        className="loader_vl"
        style={!loading ? { display: "none" } : { marginTop: "50px" }}
      >
        <Loader />
      </div>

      <Bottombar />
    </div>
  );
};

export default Viewpost;
