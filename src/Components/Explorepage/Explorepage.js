import React, { useEffect, useState } from "react";
import Bottombar from "../Bottombar/Bottombar";

import Viewsearch from "../Viewsearch/Viewsearch";
import ClearIcon from "@material-ui/icons/Clear";
import Loadericon from "../Loadericon/Loadericon";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Axios from "axios";

import "./Explorepage.css";

const Explorepage = (props) => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://instaclone111111.herokuapp.com/post/getExplorePosts`
    ).then((res) => {
      setImages(res.data);
      setLoading(false);
    });
  }, []);

  const clearSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <div>
      <div
        className="explore-page"
        style={loading ? { display: "none" } : null}
      >
        <div className="searchbar">
          <button onClick={() => props.history.goBack()} className="back-btn">
            <ArrowBackIosIcon />
          </button>

          <form>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here"
            />
            <ClearIcon className="clear-btn" onClick={clearSearch} />
          </form>
        </div>

        <div className="images-grid">
          {images
            .sort((a, b) => {
              return new Date(b.posteddate) - new Date(a.posteddate);
            })
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((post) => {
              return (
                <div
                  className="image"
                  key={post.postid}
                  onClick={() => props.history.push(`/viewPost/${post.postid}`)}
                >
                  <img src={post.imageurl} key={post.postid} alt="post" />
                </div>
              );
            })}
        </div>

        <div className="search-results">
          <Viewsearch search={search} setSearch={setSearch} />
        </div>

        <Bottombar />
      </div>

      <div style={!loading ? { display: "none" } : null}>
        <Loadericon />
      </div>
    </div>
  );
};

export default Explorepage;
