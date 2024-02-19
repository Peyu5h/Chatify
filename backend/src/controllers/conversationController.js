import createHttpError from "http-errors";

export const conversationController = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;
    const { receiver_id } = req.body;

    if (!receiver_id) {
      return next(createHttpError.BadRequest("Receiver id is required"));
    }
  } catch (error) {
    next(error);
  }
};
