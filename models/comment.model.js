import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
  text: String,
  linkTitle:String,
  link: String,
  status: {
    type:String,
    enum:["result","application","correction","upcoming"],
  },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
