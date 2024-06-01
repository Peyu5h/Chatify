import findUser from "../services/userService.js";

export const changeProfileController = async (req, res) => {
  try {
    const { userId, name, picture, status } = req.body;

    const user = await findUser(userId);
    if (name) user.name = name;
    if (picture) user.picture = picture;
    if (status) user.status = status;
    await user.save();
    res.json({ message: "Profile updated successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
