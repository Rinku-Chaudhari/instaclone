import React, { useState, useContext, useEffect } from "react";
import "./Post.css";

import Postoptions from "../Postoptions/Postoptions";
import Timecalculator from "../../Timedifference/Timediffcalculator";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Context from "../../Context/Context";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Commentsection from "../Commentsection/Commentsection";
import Loader from "../Loader/Loader";

const Post = ({
  hideOpt,
  postId,
  postImage,
  username,
  userImage,
  postedDate,
  status,
  userId,
  likes,
  history,
}) => {
  const time = Timecalculator(postedDate);
  const [updating, setUpdating] = useState(false);
  const context = useContext(Context);
  const [likedByMe, setLikedbyme] = useState(false);
  const [commentNum, setCommentnum] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/post/numOfComments/${postId}`
    ).then((res) => {
      setCommentnum(res.data[0].comment);
    });
  }, [context.updateFeed, postId]);

  useEffect(() => {
    if (context.userData.id !== undefined) {
      Axios.get(
        `https://instaclone111111.herokuapp.com/post/likedByMe/${postId}/${context.userData.id}`
      ).then((res) => {
        setLikedbyme(res.data);
      });
    }
  }, [context.userData, postId, context.updateFeed]);

  const likeUnlike = () => {
    if (context.userData.id !== undefined) {
      setUpdating(true);

      if (!likedByMe) {
        Axios.post(
          `https://instaclone111111.herokuapp.com/post/likePost/${postId}`,
          {
            userId: context.userData.id,
            ownerId: userId,
            date: new Date(),
          }
        ).then((res) => {
          setUpdating((prev) => !prev);
          context.setUpdatefeed((prev) => !prev);
        });
      } else {
        Axios.post(
          `https://instaclone111111.herokuapp.com/post/unlikePost/${postId}`,
          {
            userId: context.userData.id,
            ownerId: userId,
          }
        ).then((res) => {
          context.setUpdatefeed((prev) => !prev);
          setUpdating(false);
        });
      }
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      <div className="post" style={!loaded ? { display: "none" } : null}>
        <section className="profile_info">
          <section>
            <img
              src={userImage}
              alt="profile_pic"
              onLoad={() => setLoaded(true)}
            />
            <p onClick={() => history.push(`/profile/${username}`)}>
              {username}
            </p>
          </section>

          <section
            style={
              context.userData.id !== userId && hideOpt
                ? { display: "none" }
                : null
            }
          >
            <Postoptions ownerKey={userId} postId={postId} />
          </section>
        </section>

        <section className="image_section">
          <img src={postImage} alt="post_pic" />
        </section>

        <section className="buttons">
          <button onClick={likeUnlike} disabled={updating}>
            <FavoriteBorderIcon style={likedByMe ? { color: "red" } : null} />
          </button>
          <button>
            <ChatBubbleOutlineIcon
              onClick={() => history.push(`/viewComments/${postId}`)}
            />
          </button>
        </section>

        <section
          style={!likes ? { display: "none" } : null}
          className="view-likes"
          onClick={() => history.push(`/viewLikes/${postId}`)}
        >
          <p>{likes} likes</p>
        </section>

        <section
          className="status"
          style={!status ? { display: "none" } : null}
        >
          <p>{username}</p>
          <p>{status}</p>
        </section>

        <section
          onClick={() => history.push(`/viewComments/${postId}`)}
          className="view_comments"
          style={commentNum < 1 ? { display: "none" } : null}
        >
          <p>View {commentNum} comments</p>
        </section>

        <section className="date">
          <p>{time}</p>
        </section>

        <section className="comment">
          <Commentsection
            postid={postId}
            postOwnerId={userId}
            setUpdate={context.setUpdatefeed}
          />
        </section>
      </div>

      <div style={loaded ? { display: "none" } : null}>
        <Loader />
      </div>
    </div>
  );
};

export default withRouter(Post);
