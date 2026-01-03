import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
  title: String,
  category:String,
  conductedBy: String,
  intro: String,
  description:String,
  comments:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
  ]
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
