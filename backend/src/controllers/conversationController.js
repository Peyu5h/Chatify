import createHttpError from "http-errors";
import {
  createConversation,
  doConversationExist,
  getUserConversation,
  populatedConversation,
} from "../services/conversationService.js";
import findUser from "../services/userService.js";

export const conversationController = async (req, res, next) => {
  try {
    const sender_id = req.user.userid;
    const { receiver_id } = req.body;

    if (!receiver_id) {
      return next(createHttpError.BadRequest("Receiver id is required"));
    }

    const existed_conversation = await doConversationExist(
      sender_id,
      receiver_id
    );
    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let receiver_user = await findUser(receiver_id);

      let convoData = {
        name: receiver_user.name,
        picture: receiver_user.picture,
        isGroup: false,
        users: [sender_id, receiver_id],
      };

      const newConvo = await createConversation(convoData);
      const populatedConvo = await populatedConversation(
        newConvo._id,
        "users",
        "-password"
      );

      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversationsController = async (req, res, next) => {
  try {
    const user_id = req.user.userid;
    const conversations = await getUserConversation(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
