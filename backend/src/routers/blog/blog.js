const express = require("express");
const BlogRouter = new express.Router();
const BlogModel = require("../../model/blog/blog");
const auth = require("../../middleware/auth");

BlogRouter.post("", auth, async (req, res) => {
  try {
    const blog = new BlogModel({ ...req.body, createdBy: req.user._id });
    if (!blog) {
      throw new Error("Blog Not Created");
    }
    const saved = await blog.save();
    if (!saved) {
      throw new Error("Blog not saved");
    }
    res.status(200).send({
      message: "Blog Created",
      data: null,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

BlogRouter.get("", auth, async (req, res) => {
  try {
    const blog = await BlogModel.find({ ...req.query });
    if (!blog) {
      throw new Error("Blog not Found");
    }

    res.status(200).send({
      message: "Blog fetched",
      data: blog,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

BlogRouter.patch("/:id", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "content", "tags"];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
      return res
        .status(404)
        .send({ message: "this field is not allowed to update" });
    }
    const blog = await BlogModel.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!blog) {
      throw new Error("Blog not found");
    }
    updates.forEach((updates) => (blog[updates] = req.body[updates]));
    await blog.save();
    res.send({
      message: "Blog Updated",
      data: blog,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

BlogRouter.delete("/:id", auth, async (req, res) => {
  try {
    const deleteBlog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!deleteBlog) {
      throw new Error("Blog not deleted");
    }
    res.status(200).send({
      message: "Blog Deleted Successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = BlogRouter;
