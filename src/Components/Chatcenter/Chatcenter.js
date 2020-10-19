import React from "react";
import "./Chatcenter.css";

import Navbar from "../Navbar/Navbar";
import Bottombar from "../Bottombar/Bottombar";
import SendIcon from "@material-ui/icons/Send";

const Chatcenter = () => {
  return (
    <div className="chat_center">
      <Navbar />

      <div className="chat_box">
        <div className="side_bar">
          <div className="person">
            <img src="https://bit.ly/2F6CWhC" alt="profile_img" />
            <p>taylor_swift</p>
          </div>

          <div className="person">
            <img src="https://bit.ly/2F6CWhC" alt="profile_img" />
            <p>bruno_penandes</p>
          </div>
        </div>

        <div className="chat_section">
          <div className="chat">
            <p className="sent">this is sent message</p>
            <p className="received">this is received message</p>
          </div>

          <form>
            <input type="text" placeholder="send message" />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
      </div>

      <Bottombar />
    </div>
  );
};

export default Chatcenter;
