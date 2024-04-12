import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const Conversation_URL = `${
  import.meta.env.VITE_CONVERSATION_URL
}/conversations`;

const Message_URL = `${import.meta.env.VITE_BACKEND_URL}/message`;

const initialState = {
  status: "",
  error: "",
  conversation: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
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

export const openCreateConversation = createAsyncThunk(
  "conversation/openCreateConversation",
  async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    try {
      const response = await fetch(`${Conversation_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getConvoMessages = createAsyncThunk(
  "conversation/getMessages",
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const response = await fetch(`${Message_URL}/${convo_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

export const sendMessage = createAsyncThunk(
  "message/send",
  async (values, { rejectWithValue }) => {
    const { token, message, files, convo_id } = values;
    try {
      const response = await fetch(`${Message_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, files, convo_id }),
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

    updateMessages: (state, action) => {
      //update messages
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      //update conversation
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvo = [...state.conversation].filter(
        (convo) => convo._id !== conversation._id
      );

      newConvo.unshift(conversation);
      state.conversation = newConvo;
    },

    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    removeFileFromArray: (state, action) => {
      const index = action.payload;
      const files = [...state.files];
      const fileToRemove = [files[index]];
      state.files = state.files.filter((file) => file !== action.payload);
    },
    clearFiles: (state) => {
      state.files = [];
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
      })
      .addCase(openCreateConversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(openCreateConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
        state.files = [];
      })
      .addCase(openCreateConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getConvoMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConvoMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getConvoMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];

        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvo = [...state.conversation].filter(
          (convo) => convo._id !== conversation._id
        );

        newConvo.unshift(conversation);
        state.conversation = newConvo;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setActiveConveration,
  updateMessages,
  addFiles,
  removeFileFromArray,
  clearFiles,
} = chatSlice.actions;
export default chatSlice.reducer;
