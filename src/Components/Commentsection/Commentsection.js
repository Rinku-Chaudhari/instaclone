import React, { useContext, useState } from "react";
import "./Commentsection.css";

import Context from "../../Context/Context";
import Axios from "axios";

const Commentsection = (props) => {
  const [comment, SetComment] = useState("");
  const context = useContext(Context);
  const submitComment = (e) => {
    e.preventDefault();

    if (comment.trim().length >= 2) {
      if (props.noSideEffect) {
        props.setCommentnum((prev) => parseInt(prev) + 1);
      }
      Axios.post("https://instaclone111111.herokuapp.com/comment/addComment", {
        postId: props.postid,
        comment: comment,
        commenterId: context.userData.id,
        postedDate: new Date(),
        postOwnerId: props.postOwnerId,
      }).then((res) => {
        SetComment("");

        if (!props.noSideEffect) {
          context.setUpdatefeed((prev) => !prev);
          props.setUpdate((prev) => !prev);
        }
      });
    }
  };

  return (
    <div
      className={props.show ? "comment_section" : "comment_section_hide"}
      style={context.userData.id === undefined ? { display: "none" } : null}
    >
      <form onSubmit={submitComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => SetComment(e.target.value)}
          placeholder="Add a comment"
        />
        <input
          type="submit"
          value="post"
          disabled={comment.trim().length <= 2}
        />
      </form>
    </div>
  );
};

export default Commentsection;
