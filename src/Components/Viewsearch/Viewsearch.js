import React from "react";

import "./Viewsearch.css";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const Viewsearch = (props) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (props.search.trim() !== "") {
      Axios.get(
        `https://instaclone111111.herokuapp.com/userInfo/searchUsers/${props.search}`
      ).then((res) => {
        setResults(res.data);
      });
    }
  }, [props.search]);

  const vistProfile = (username) => {
    props.setSearch("");
    props.history.push(`/profile/${username}`);
  };

  return (
    <div
      className="viewsearch"
      style={props.search.trim() === "" ? { display: "none" } : null}
    >
      {results.length >= 1 ? (
        results.map((e) => {
          return (
            <div
              className="founduser"
              onClick={() => vistProfile(e.username)}
              key={e.id}
            >
              <img src={e.profileimage} alt="profile" />
              <p key={e.id}>{e.username}</p>
            </div>
          );
        })
      ) : (
        <p style={{ textAlign: "center" }}>Nothing found.</p>
      )}
    </div>
  );
};

export default withRouter(Viewsearch);
