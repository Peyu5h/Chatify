import UserModel from "../models/UserModel.js";
import conversationsModel from "../models/ConversationModel.js";
import MessageModel from "../models/MessageModel.js";
import createHttpError from "http-errors";

export const createMessage = async (msgData) => {
  let newMessage = await MessageModel.create(msgData);
  if (!newMessage) throw createHttpError.BadRequest("Message not created");
  return newMessage;
};

export const populatedMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({ path: "sender", select: "name  picture", model: "UserModel" })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name eamil picture status",
        model: "UserModel",
      },
    });
  if (!msg) {
    throw createHttpError.BadRequest("Message not found");
  }
  return msg;
};
