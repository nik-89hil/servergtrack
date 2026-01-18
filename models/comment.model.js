import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
  text: String,
  linkTitle:String,
  link: String,
  category:String,
  status: {
    type:String,
    enum:["result","application","other"],
  },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
