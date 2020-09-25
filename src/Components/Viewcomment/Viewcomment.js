import React, { useState, useContext, useEffect } from "react";
import "./Viewcomment.css";

import timeDifference from "../../Timedifference/Timediffcalculator";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Context from "../../Context/Context";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const Viewcomment = ({
  commentId,
  username,
  profileImage,
  comment,
  postedDate,
  commenterId,
  likers,
  history,
  setUpdatecomments,
  ownerId,
  postId,
}) => {
  const time = timeDifference(postedDate, true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updateComment, setUpdatecomment] = useState(false);
  const context = useContext(Context);
  const [likedByMe, setLikedbyme] = useState(false);

  useEffect(() => {
    if (context.userData.id !== undefined) {
      Axios.get(
        `https://instaclone111111.herokuapp.com/comment/likedByMe/${commentId}/${context.userData.id}`
      ).then((res) => {
        setLikedbyme(res.data);
      });
    }
  }, [context.userData.id, commentId, updateComment]);

  const deleteComment = () => {
    setDeleting(true);
    Axios.delete(
      `https://instaclone111111.herokuapp.com/comment/deleteComment/${commentId}`
    ).then((res) => {
      setUpdatecomments((prev) => !prev);
      setDeleting(false);
    });
  };

  const likeUnlikeComment = () => {
    if (context.userData.id !== undefined) {
      setUpdating(true);
      if (likedByMe) {
        Axios.post(
          `https://instaclone111111.herokuapp.com/comment/unlikeComment/${commentId}`,
          {
            likerId: context.userData.id,
          }
        ).then((res) => {
          if (res.data === "done") {
            setUpdatecomment((prev) => !prev);
            setUpdatecomments((prev) => !prev);
            setUpdating(false);
          }
        });
      } else {
        Axios.post(
          `https://instaclone111111.herokuapp.com/comment/likeComment/${commentId}`,
          {
            likerId: context.userData.id,
            ownerId: ownerId,
            date: new Date(),
            postId: postId,
          }
        ).then((res) => {
          if (res.data === "done") {
            setUpdatecomment((prev) => !prev);
            setUpdatecomments((prev) => !prev);
            setUpdating(false);
          }
        });
      }
    } else {
      history.push(`/login`);
    }
  };

  return (
    <div className="comment">
      <div className="left">
        <img src={profileImage} alt="commenter" />
        <p
          style={{
            fontWeight: "bold",
            wordBreak: "keep-all",
            marginRight: "10px",
          }}
        >
          {username}
        </p>

        <div className="lr">
          <p>{comment}</p>

          <div>
            <p>{time.slice(0, 6)}</p>
            <button
              onClick={likeUnlikeComment}
              style={context.userData.id === "" ? { display: "none" } : null}
            >
              <FavoriteBorderIcon
                disabled={updating}
                style={likedByMe ? { color: "red" } : null}
              />
            </button>
            <p
              className="likes_view"
              onClick={() => history.push(`/viewCommentLikes/${commentId}`)}
            >
              {likers === null ? 0 : likers}
            </p>
            <button
              onClick={deleteComment}
              disabled={deleting}
              style={
                context.userData.id !== parseInt(commenterId)
                  ? { display: "none" }
                  : null
              }
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Viewcomment);
