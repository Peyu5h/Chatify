import mongoose from "mongoose";

import { ObjectId } from "mongoose.Schema.Types";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      required: true,
    },
    conversation: {
      type: ObjectId,
      ref: "conversationsModel",
    },
    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

const MessageModel =
  mongoose.model.MessageModel || mongoose.model("MessageModel", messageSchema);
