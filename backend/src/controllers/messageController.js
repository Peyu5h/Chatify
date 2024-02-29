import createHttpError from "http-errors";
import logger from "../configs/logger.js";
import { createMessage, populatedMessage } from "../services/messageService.js";
import { updatedLatestMessgae } from "../services/conversationService.js";

export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userid;
    const { message, convo_id, files } = req.body;

    if (!convo_id || (!message && !files)) {
      logger.error("Convo_id and message or files are required");
      return res
        .status(400)
        .json({ error: "Convo_id and message or files are required" });
    }
    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };
    let newMessage = await createMessage(msgData);
    let populatedMsg = await populatedMessage(newMessage._id);
    await updatedLatestMessgae(convo_id, newMessage);
    res.json(populatedMsg);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    res.send("get message");
  } catch (error) {
    next(error);
  }
};
