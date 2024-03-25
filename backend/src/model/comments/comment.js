const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "blog",
  },
  comment: {
    type: String,
    required: true,
  },
});

const CommentModel = new mongoose.model("comment", CommentSchema);

module.exports = CommentModel;
