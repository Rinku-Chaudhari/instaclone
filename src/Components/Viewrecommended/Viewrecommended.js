import React, { useState, useEffect, useContext } from "react";

import "./Viewrecommended.css";

import Context from "../../Context/Context";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const Recommended = (props) => {
  const [recommended, setRecommended] = useState([]);
  const context = useContext(Context);

  useEffect(() => {
    if (context.userData.id !== undefined) {
      Axios.get(
        `https://instaclone111111.herokuapp.com/userInfo/getRecommended/${context.userData.id}`
      ).then((res) => {
        setRecommended(res.data);
      });
    }
  }, [context.userData]);

  return (
    <div className="Recommendedpage">
      <h5>Suggestions for you</h5>
      <div className="recom-users">
        {recommended.map((user) => {
          return (
            <div className="recom-user" key={user.id}>
              <div className="profile-img">
                <img src={user.profileimage} alt="prof-img" />
              </div>
              <div className="profile-info">
                <p
                  className="username"
                  onClick={() =>
                    props.history.push(`/profile/${user.username}`)
                  }
                >
                  {user.username}
                </p>
                <p>Follows you</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(Recommended);
