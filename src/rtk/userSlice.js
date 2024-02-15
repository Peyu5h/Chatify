import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: "",

  user: {
    id: "",
    name: "Hellllow",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      (state.status = ""),
        (state.error = ""),
        (state.user = {
          id: "",
          name: "",
          email: "",
          picture: "",
          status: "",
          token: "",
        });
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
