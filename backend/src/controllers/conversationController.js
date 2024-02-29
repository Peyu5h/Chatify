import createHttpError from "http-errors";
import { doConversationExist } from "../services/conversationService.js";

export const conversationController = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;
    const { receiver_id } = req.body;

    if (!receiver_id) {
      return next(createHttpError.BadRequest("Receiver id is required"));
    }

    const existed_conversation = await doConversationExist(
      sender_id,
      receiver_id
    );
    if (existed_conversation) {
      res.json({ existed_conversation });
    } else {
      res.json({ message: "No conversation found" });
    }
  } catch (error) {
    next(error);
  }
};
