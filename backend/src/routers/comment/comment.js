const express = require("express");

const CommentRoute = new express.Router();
const auth = require("../../middleware/auth");
const CommentModel = require("../../model/comments/comment");

CommentRoute.post("/:blogId", auth, async (req, res) => {
  try {
    const comment = new CommentModel({
      ...req.body,
      createdBy: req.user._id,
      blogId: req.params.blogId,
    });
    if (!comment) {
      throw new Error("comment not added");
    }
    const saved = await comment.save();

    if (!saved) {
      throw new Error("comment not added");
    }

    res.status(200).send({
      message: "comment added successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

CommentRoute.get("/:blogId", auth, async (req, res) => {
  try {
    const comment = await CommentModel.find({
      blogId: req.params.blogId,
    }).populate("createdBy");

    if (!comment) {
      throw new Error("Comment not fetched");
    }

    res.status(200).send({
      message: "Comment Fetched",
      comments: comment,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

CommentRoute.delete("/:commentId", auth, async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndDelete({
      _id: req.params.commentId,
      createdBy: req.user._id,
    });

    if (!comment) {
      throw new Error("comment not deleted");
    }

    res.status(200).send({
      message: "comment deleted",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = CommentRoute;
