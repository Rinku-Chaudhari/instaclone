import React, { useState, useEffect, useContext, useRef } from "react";
import "./Feed.css";

import Axios from "axios";
import Navbar from "../Navbar/Navbar";
import Context from "../../Context/Context";
import Post from "../Post/Post";
import Viewrecommended from "../Viewrecommended/Viewrecommended";
import Loadericon from "../Loadericon/Loadericon";
import Bottombar from "../Bottombar/Bottombar";

const Feed = () => {
  const [myFeed, setMyfeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (context.userData.id !== undefined) {
      Axios.get(
        `https://instaclone111111.herokuapp.com/post/myFeed/${context.userData.id}`
      ).then((res) => {
        if (mountedRef) {
          setMyfeed(res.data);
          setLoading(false);
        }
      });

      return () => {
        mountedRef.current = false;
      };
    }
  }, [context.userData.id, context.updateFeed]);

  return (
    <div>
      <div className="feed_r" style={loading ? { display: "none" } : null}>
        <div className="feed_page">
          <Navbar />

          <div className="posts">
            {myFeed.length > 0 ? (
              myFeed
                .sort((a, b) => {
                  return new Date(b.posteddate) - new Date(a.posteddate);
                })
                .map((post) => {
                  return (
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
                  );
                })
            ) : (
              <p style={{ textAlign: "center", fontSize: "16px" }}>
                Start following your friends to see their posts.
              </p>
            )}
          </div>
        </div>

        <div className="recommended">
          <Viewrecommended />
        </div>

        <Bottombar />
      </div>

      <div className="loading_f" style={!loading ? { display: "none" } : null}>
        <Loadericon />
      </div>
    </div>
  );
};

export default Feed;
