import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  name: String,
  email: { type: String, unique: true },
  picture: String,
  provider: { type: String, default: 'google' },
  googleId: String,
  isAdmin:{type:Boolean,default:false}
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
