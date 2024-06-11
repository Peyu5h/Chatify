import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Peer from "peerjs";
import { useSelector } from "react-redux";
const backendUrl = import.meta.env.VITE_BACKEND_URL.split("/api/v1")[0];

const initialState = {
  status: "",
  error: "",

  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
    peerId: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const changeProfile = createAsyncThunk(
  "change/profile",
  async (data) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/changeProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error updating profile");
      }
      const deta = await response.json();
      console.log(deta);
      return deta;
    } catch (error) {
      return error;
    }
  }
);

export const initializePeerThunk = createAsyncThunk(
  "user/initializePeer",
  async () => {
    return new Promise((resolve, reject) => {
      const newPeer = new Peer(undefined, {
        host: "webrtc-vepg.onrender.com",
        secure: true,
        path: "/peerjs",
      });

      newPeer.on("open", (id) => {
        resolve({ peer: newPeer, peerId: id });
      });

      newPeer.on("error", (err) => {
        reject(err);
      });
    });
  }
);

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
          peerId: "",
        });
    },
    updatePeerIds: (state, action) => {
      console.log("Updating peer IDs:", action.payload);
      state.peerIds = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.status = "success";
        const userData = action.payload.user;
        state.user.user = { ...state.user.user, ...userData };
      })
      .addCase(changeProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(initializePeerThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializePeerThunk.fulfilled, (state, action) => {
        state.user.peerId = action.payload.peerId;
        state.status = "succeeded";
      })
      .addCase(initializePeerThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { login, logout, updatePeerIds } = userSlice.actions;

export default userSlice.reducer;
