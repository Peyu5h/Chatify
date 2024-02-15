export const register = async (req, res, next) => {
  try {
    res.send("This is the register route");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    res.send("This is the login route");
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.send("This is the logout route");
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    res.send("This is the token route");
  } catch (error) {
    next(error);
  }
};
