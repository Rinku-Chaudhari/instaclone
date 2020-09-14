const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const app = express();

app.use(cors());
app.use(parser.json());

//routes
const auth = require("./routes/auth");
const userInfo = require("./routes/userInfo");
const post = require("./routes/post");
const comment = require("./routes/comment");

app.use("/auth", auth);
app.use("/userInfo", userInfo);
app.use("/post", post);
app.use("/comment", comment);

module.exports = app;
