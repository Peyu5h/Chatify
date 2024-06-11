import findUser from "../services/userService.js";

export const setPeerController = async (req, res) => {
  try {
    const { userId, peerId } = req.body;

    const user = await findUser(userId);
    if (user) {
      user.peerId = peerId;
      await user.save();
      res.json({ user: user });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getPeerController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUser(userId);
    if (user) {
      res.json({ user: user });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
