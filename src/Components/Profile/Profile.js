import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";

import Axios from "axios";
import Navbar from "../Navbar/Navbar";
import Context from "../../Context/Context";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewArrayIcon from "@material-ui/icons/ViewArray";
import Post from "../Post/Post";
import Loadericon from "../Loadericon/Loadericon";
import Bottombar from "../Bottombar/Bottombar";
import Profileinfo from "../Profileinfo/Profileinfo";

const Profile = (props) => {
  const [profileInfo, setProfileinfo] = useState([]);
  const [userPosts, setUserposts] = useState([]);
  const [postViewMode, setPostviewmode] = useState("grid");
  const [followedByMe, setFollowedbyme] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);

  const followUnfollow = () => {
    setUpdating(true);
    if (context.userData.id !== undefined) {
      if (!followedByMe) {
        Axios.post(`https://instaclone111111.herokuapp.com/userInfo/follow/`, {
          followerId: context.userData.id,
          followingId: profileInfo.id,
          date: new Date(),
        }).then((res) => {
          setUpdating(false);
        });
      } else {
        Axios.post(`https://instaclone111111.herokuapp.com/userInfo/unfollow`, {
          unfollowerId: context.userData.id,
          unfollowingId: profileInfo.id,
        }).then((res) => {
          setUpdating(false);
        });
      }
    } else {
      props.history.push("/login");
    }
  };

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/userInfo/getUserData/${
        props.match.params.username
      }/${context.userData.id || 0}`
    ).then((res0) => {
      setProfileinfo(res0.data.userData[0]);
      setUserposts(res0.data.posts);
      setFollowedbyme(
        res0.data.userData.length > 0
          ? res0.data.userData[0].followedbyme
          : false
      );
      setLoading(false);
    });
  }, [props.match.params.username, context.userData, updating]);

  const toggleViewMode = (mode) => {
    setPostviewmode(mode);
  };

  return (
    <div>
      <div className="profile" style={loading ? { display: "none" } : null}>
        <Navbar />

        <section
          style={
            !loading && profileInfo
              ? { display: "none" }
              : { marginTop: "50px", textAlign: "center" }
          }
        >
          <p>User not found!</p>
        </section>

        <section
          className="profile_info_"
          style={!loading && !profileInfo ? { display: "none" } : null}
        >
          <Profileinfo
            profileInfo={profileInfo ? profileInfo : []}
            posts={userPosts.length}
            context={context}
            updating={updating}
            followedByMe={followedByMe}
            followUnfollow={followUnfollow}
            Updating={updating}
          />
        </section>

        <section
          className="post_view_options"
          style={!loading && !profileInfo ? { display: "none" } : null}
        >
          <div
            className={postViewMode === "grid" ? "grid_on" : null}
            onClick={() => toggleViewMode("grid")}
          >
            <ViewModuleIcon />
            <p>Grid View</p>
          </div>
          <div
            className={postViewMode === "post" ? "post_on" : null}
            onClick={() => toggleViewMode("post")}
          >
            <ViewArrayIcon />
            <p>Post View</p>
          </div>
        </section>

        <section
          className="image_grid"
          style={postViewMode !== "grid" ? { display: "none" } : null}
        >
          {userPosts
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .map((post) => {
              return (
                <div className="post_g" key={post.postid}>
                  <img src={post.postimage} alt="post_image" />
                </div>
              );
            })}
        </section>

        <section
          className="posts_view"
          style={postViewMode !== "post" ? { display: "none" } : null}
        >
          {userPosts
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
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
                  likes={post.likers}
                  hideOpt={true}
                />
              );
            })}
        </section>
        <Bottombar />
      </div>

      <div
        className="loader_section"
        style={!loading ? { display: "none" } : null}
      >
        <Loadericon />
      </div>
    </div>
  );
};

export default Profile;
