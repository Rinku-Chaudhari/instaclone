import React, { useState, useContext } from "react";

import "./Postoptions.css";
import Axios from "axios";
import Context from "../../Context/Context";

import Backdrop from "../Backdrop/Backdrop";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const Postoptions = (props) => {
  const context = useContext(Context);
  const [showBackdrop, setShowbackdrop] = useState(false);
  const mypost = props.ownerKey === context.userData.id;

  const toggleOptions = () => {
    setShowbackdrop((prev) => !prev);
    const optionsModal = document.querySelector(`.modal${props.postId}`);
    optionsModal.classList.toggle("show");
  };

  const deletePost = () => {
    toggleOptions();
    Axios.delete(
      `https://instaclone111111.herokuapp.com/post/deletePost/${props.postId}`
    ).then((res) => {
      context.setUpdatefeed((prev) => !prev);
    });
  };

  const unFollow = () => {
    toggleOptions();
    Axios.post(`https://instaclone111111.herokuapp.com/userInfo/unfollow`, {
      unfollowerId: context.userData.id,
      unfollowingId: props.ownerKey,
    }).then((res) => {
      if (res.data === "done") {
        context.setUpdatefeed((prev) => !prev);
      }
    });
  };

  return (
    <div className="Postoptions">
      <div className="toggler">
        <MoreHorizIcon onClick={toggleOptions} />
      </div>

      <Backdrop show={showBackdrop} toggle={toggleOptions} />

      <div className={`options-modal ${"modal" + props.postId}`}>
        <div className="update" style={!mypost ? { display: "none" } : null}>
          <button onClick={deletePost} style={{ color: "red" }}>
            Delete
          </button>
          <button onClick={toggleOptions}>Cancel</button>
        </div>

        <div
          className="unfollow-option"
          style={mypost ? { display: "none" } : null}
        >
          <button onClick={unFollow}>Unfollow</button>
          <button onClick={toggleOptions}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Postoptions;
