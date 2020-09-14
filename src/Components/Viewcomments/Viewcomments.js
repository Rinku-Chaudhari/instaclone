import React, { useState, useEffect } from "react";
import "./Viewcomments.css";

import Navbar2 from "../Navbar2/Navbar2";
import Viewcomment from "../Viewcomment/Viewcomment";
import Loader from "../Loader/Loader";
import Bottombar from "../Bottombar/Bottombar";
import Commentsection from "../Commentsection/Commentsection";

import Axios from "axios";

const Viewcomments = (props) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const postId = props.match.params.postId;
  const [postOwnerid, setPostOwnerid] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateComments, setUpdatecomments] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/comment/getComments/${postId}`
    ).then((res) => {
      setComments(res.data);
      setLoading(false);
    });

    Axios.get(
      `https://instaclone111111.herokuapp.com/comment/getPostOwnerId/${postId}`
    ).then((res) => {
      if (res.data.length !== 0) {
        setPostOwnerid(res.data[0].ownerkey);
      }
    });
  }, [postId, updateComments, update]);

  return (
    <div className="view_comments">
      <Navbar2 middleText="Comments" />
      <div className="comments">
        <Commentsection
          postid={postId}
          postOwnerId={postOwnerid}
          setUpdate={setUpdate}
          show={true}
        />
        {comments.length > 0 ? (
          comments
            .sort((a, b) => {
              return new Date(b.posteddate) - new Date(a.posteddate);
            })
            .map((comment) => {
              return (
                <div
                  style={loading ? { display: "none" } : null}
                  key={comment.commentid}
                >
                  <Viewcomment
                    commentId={comment.commentid}
                    username={comment.username}
                    profileImage={comment.profileimage}
                    comment={comment.comment}
                    postedDate={comment.posteddate}
                    commenterId={comment.commenterid}
                    likers={comment.likers}
                    setUpdatecomments={setUpdatecomments}
                    ownerId={comment.ownerid}
                    postId={postId}
                  />
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
            No any comments
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

export default Viewcomments;
