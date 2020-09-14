import React, { useState, useEffect } from "react";
import "./App.css";

import { Route, Switch, withRouter } from "react-router-dom";
import Landingpage from "./Components/Landingpage/Landingpage";
import Feed from "./Components/Feed/Feed";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Context from "./Context/Context";
import Newpost from "./Components/Newpost/Newpost";
import Viewlikes from "./Components/Viewlikes/Viewlikes";
import Viewcomments from "./Components/Viewcomments/Viewcomments";
import Profile from "./Components/Profile/Profile";
import Viewfollowers from "./Components/Viewfollowers/Viewfollowers";
import Viewfollowing from "./Components/Viewfollowing/Viewfollowing";
import Editprofile from "./Components/Editprofile/Editprofile";
import Axios from "axios";
import Viewcommentlikes from "./Components/Viewcommentlikes/Viewcommentlikes";
import Viewnotifications from "./Components/Viewnotifications/Viewnotifications";
import Explorepage from "./Components/Explorepage/Explorepage";
import Page404 from "./Components/404Page/Page404";
import Viewpost from "./Components/Viewpost/Viewpost";

function App(props) {
  const [currentUser, setCurrentuser] = useState("");
  const [userData, setUserdata] = useState([]);
  const [updateFeed, setUpdatefeed] = useState(false);
  const [updateNoti, setUpdatenoti] = useState(false);
  const [unseen, setUnseen] = useState(false);
  const [file, setFile] = useState(null);
  const currentUserId = localStorage.getItem("userId");

  let homeRoute =
    currentUserId === null || currentUserId === "" ? (
      <Route path="/" exact component={Landingpage} />
    ) : (
      <Route path="/" exact component={Feed} />
    );

  useEffect(() => {
    if (currentUserId !== "" && currentUserId !== null) {
      Axios.get(
        `https://instaclone111111.herokuapp.com/userInfo/currentUserData/${currentUserId}`
      ).then((res) => {
        setUserdata(res.data);
        setCurrentuser(res.data.username);
      });
    }
  }, [currentUserId, updateFeed]);

  useEffect(() => {
    if (currentUserId !== "") {
      Axios.get(
        `https://instaclone111111.herokuapp.com/userInfo/getUnseen/${currentUserId}`
      ).then((res) => {
        if (res.data.length > 0) {
          setUnseen(true);
        } else {
          setUnseen(false);
        }
      });
    }
  }, [currentUserId, updateNoti]);

  return (
    <Context.Provider
      value={{
        unseen: unseen,
        updateNoti: updateNoti,
        setUpdatenoti: setUpdatenoti,
        updateFeed: updateFeed,
        setUpdatefeed: setUpdatefeed,
        currentUser: currentUser,
        setCurrentuser: setCurrentuser,
        userData: userData,
        setUserdata: setUserdata,
        file: file,
        setFile: setFile,
      }}
    >
      <Switch>
        {homeRoute}
        <Route path="/register" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/newpost" exact component={Newpost} />
        <Route path="/viewLikes/:postId" exact component={Viewlikes} />
        <Route path="/viewComments/:postId" exact component={Viewcomments} />
        <Route path="/profile/:username" exact component={Profile} />
        <Route path="/followers/:userId" exact component={Viewfollowers} />
        <Route path="/followings/:userId" exact component={Viewfollowing} />
        <Route path="/editprofile" exact component={Editprofile} />
        <Route
          path="/viewCommentlikes/:commentId"
          exact
          component={Viewcommentlikes}
        />
        <Route path="/explore" exact component={Explorepage} />
        <Route path="/viewPost/:postId" exact component={Viewpost} />
        <Route path="/notifications" exact component={Viewnotifications} />
        <Route component={Page404} />
      </Switch>
    </Context.Provider>
  );
}

export default withRouter(App);
