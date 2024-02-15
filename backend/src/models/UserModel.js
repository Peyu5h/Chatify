import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },

    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },

    status: {
      type: String,
      default: "Hey there! I am using Chatify",
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [64, "Password too long!"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel =
  mongoose.model.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
