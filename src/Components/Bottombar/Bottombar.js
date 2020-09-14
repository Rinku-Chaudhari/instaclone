import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context/Context";

import "./Bottombar.css";

import AddBoxIcon from "@material-ui/icons/AddBox";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

const Bottombar = (props) => {
  const context = useContext(Context);

  const updateFile = (e) => {
    if (e.target.files[0]) {
      context.setFile(e.target.files[0]);
      props.history.push("/newpost");
    }
  };

  return (
    <div
      className="bottom-bar"
      style={context.userData.id === undefined ? { display: "none" } : null}
    >
      <li>
        <NavLink to="/" exact activeStyle={{ color: "skyblue" }}>
          <HomeIcon />
        </NavLink>
      </li>
      <li>
        <NavLink to="/explore" exact activeStyle={{ color: "skyblue" }}>
          <SearchIcon />
        </NavLink>
      </li>
      <li>
        <form className="image-form">
          <input type="file" onChange={updateFile} id="file" accept="image/*" />
          <label htmlFor="file">
            <AddBoxIcon />
          </label>
        </form>
      </li>
      <li>
        <NavLink to="/notifications" exact activeStyle={{ color: "skyblue" }}>
          <NotificationsNoneIcon
            style={context.unseen ? { color: "red" } : null}
          />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/profile/${context.userData.username}`}
          exact
          activeStyle={{ borderColor: "skyblue" }}
        >
          <img src={context.userData.profileimage} alt="imga" />
        </NavLink>
      </li>
    </div>
  );
};

export default Bottombar;
