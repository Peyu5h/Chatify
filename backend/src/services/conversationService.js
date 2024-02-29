import createHttpError from "http-errors";
import conversationsModel from "../models/ConversationModel.js";
import UserModel from "../models/UserModel.js";

const doConversationExist = async (sender_id, receiver_id) => {
  let convos = await conversationsModel
    .find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: sender_id } } },
        { users: { $elemMatch: { $eq: receiver_id } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convos) {
    throw createHttpError.BadRequest("No conversation found");
  }

  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return convos[0];
};

export { doConversationExist };

export const createConversation = async (convoData) => {
  const newConvo = await conversationsModel.create(convoData);
  if (!newConvo) throw createHttpError.BadRequest("Conversation not created");
  return newConvo;
};

export const populatedConversation = async (
  id,
  fieldToPopulate,
  fieldToRemove
) => {
  const populatedConvo = await conversationsModel
    .findOne({ _id: id })
    .populate(fieldToPopulate, fieldToRemove);
  if (!populatedConvo)
    throw createHttpError.BadRequest("Conversation not found");
  return populatedConvo;
};

export const getUserConversation = async (user_id) => {
  const convos = await conversationsModel
    .find({ users: { $elemMatch: { $eq: user_id } } })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  if (!convos) throw createHttpError.BadRequest("No conversation found");

  const populatedConvos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return populatedConvos;
};

export const updatedLatestMessgae = async (convo_id, message) => {
  const updatedConvo = await conversationsModel.findByIdAndUpdate(convo_id, {
    latestMessage: message,
  });
  if (!updatedConvo)
    throw createHttpError.BadRequest("Latest message not updated");
  return updatedConvo;
};
