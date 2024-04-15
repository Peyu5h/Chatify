import app from "./app.js";
import logger from "./configs/logger.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;
const mongoUrl = process.env.DATABASE_URL;

console.log("mode = " + process.env.NODE_ENV);

// ============== MongoDB Connection ============== //
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(error.message);
  });

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", false);
}
// ================================================= //

let server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  logger.info("New Connection");

  // joins on opening website
  socket.on("join", (user) => {
    socket.join(user);

    //add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      console.log(`user ${user} is now online`);
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);

    //send socketid
    io.emit("setup socket", socket.id);
  });
  //socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user has just disconnected");

    io.emit("get-online-users", onlineUsers);
  });

  // joins conversation with frnd
  socket.on("join_conversation", (conversation) => {
    socket.join(conversation);
  });

  //send receive message
  socket.on("send_message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) {
      return;
    }
    conversation.users.forEach((user) => {
      if (user !== message.sender) {
        socket.in(user._id).emit("receive_message", message);
      }
    });
  });

  socket.on("typing", (conversation) => {
    console.log("typing...", conversation);
    socket.in(conversation).emit("typing");
  });
  socket.on("stopTyping", (conversation) => {
    console.log("stop typing...", conversation);
    socket.in(conversation).emit("stopTyping");
  });
});

// ============== Error Handling (prettier) ============== //
const exitHandle = () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const errorHandle = (error) => {
  logger.error(error.message);
  exitHandle();
};

process.on("uncaughtException", errorHandle);
process.on("unhandledRejection", errorHandle);

// ======================================================= //
