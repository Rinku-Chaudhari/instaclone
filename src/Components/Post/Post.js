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
  likesCount,
  history,
}) => {
  const time = Timecalculator(postedDate);
  const context = useContext(Context);
  const [likedByMe, setLikedbyme] = useState(false);
  const [commentNum, setCommentnum] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [likes, setLikes] = useState(likesCount);

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
      setLikedbyme((prev) => !prev);

      if (!likedByMe) {
        setLikes((prev) => prev + 1);
        Axios.post(
          `https://instaclone111111.herokuapp.com/post/likePost/${postId}`,
          {
            userId: context.userData.id,
            ownerId: userId,
            date: new Date(),
          }
        );
      } else {
        setLikes((prev) => prev - 1);
        Axios.post(
          `https://instaclone111111.herokuapp.com/post/unlikePost/${postId}`,
          {
            userId: context.userData.id,
            ownerId: userId,
          }
        );
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
          <button onClick={likeUnlike}>
            <FavoriteBorderIcon style={likedByMe ? { color: "red" } : null} />
          </button>
          <button>
            <ChatBubbleOutlineIcon
              onClick={() => history.push(`/viewComments/${postId}`)}
            />
          </button>
        </section>

        <section className="other_stuffs">
          <p
            style={!likes ? { display: "none" } : null}
            onClick={() => history.push(`/viewLikes/${postId}`)}
          >
            <b>{likes} likes</b>
          </p>
          <p style={!status ? { display: "none" } : null}>
            <b>{username}</b> {status}
          </p>
          <p
            style={commentNum < 1 ? { display: "none" } : null}
            onClick={() => history.push(`/viewComments/${postId}`)}
          >
            <b>View {commentNum} comments</b>
          </p>
          <p>{time.toUpperCase()}</p>
        </section>

        <section className="comment_section">
          <Commentsection
            postid={postId}
            postOwnerId={userId}
            setUpdate={context.setUpdatefeed}
            setCommentnum={setCommentnum}
            noSideEffect={true}
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
