const express = require("express");
const app = express();
const authRoutes = require("./routers/auth/auth");
const BlogRoute = require("./routers/blog/blog");
const CommentRoute = require("./routers/comment/comment");

require("./database/db");
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/blog", BlogRoute);
app.use("/comment", CommentRoute);

app.listen(3000, () => {
  console.log("app is served");
});
