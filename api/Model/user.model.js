import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,

      required: true,
    },
    profilePicture:
    {
      type:String,
      default:"https://static.vecteezy.com/system/resources/previews/027/448/973/original/avatar-account-icon-default-social-media-profile-photo-vector.jpg"
    },
    isAdmin:
    {
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
