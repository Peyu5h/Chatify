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

  if (!convos || convos.length === 0) {
    // Check for empty array
    throw createHttpError.BadRequest("Conversation not found");
  }

  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return convos;
};

export { doConversationExist };
