import mongoose, { models } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
    content: { type: String, required: true },
    userId: {type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,}
  },
  { timestamps: true }
);

const Blog = models.Blog || new mongoose.model("Blog", blogSchema);

export default Blog;
