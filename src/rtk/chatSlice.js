import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const Conversation_URL = `${
  import.meta.env.VITE_CONVERSATION_URL
}/conversations`;

const initialState = {
  status: "",
  error: "",
  conversation: [],
  activeConversation: {},
  notifications: [],
};

export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Conversation_URL}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConveration: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversation = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveConveration } = chatSlice.actions;
export default chatSlice.reducer;
