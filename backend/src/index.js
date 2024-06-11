import express from "express";
import logger from "./configs/logger.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import trimrRequest from "trim-request";
import createHttpError from "http-errors";
import routes from "./routes/index.js";
import { ExpressPeerServer } from "peer";

dotenv.config();

const app = express();

// ================== MIDDLEWARES ================== //
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //morgan logs the req details
}
app.use(helmet()); //helmet adds security headers to the response
app.use(express.json()); //parse the req body
app.use(express.urlencoded({ extended: true })); //parse the url encoded data
app.use(mongoSanitize()); //sanitize the data to prevent NoSQL injection
app.use(cookieParser()); //parse the cookies
app.use(compression()); //compress the response
app.use(fileUpload({ useTempFiles: true })); //parse the file upload
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(trimrRequest.all); //trim request data

app.use("/api/v1", routes);

// Error handling middleware
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// ================================================= //

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

// peer server
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);

// socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
});

let onlineUsers = [];

io.on("connection", (socket) => {
  logger.info("New Connection");

  // joins on opening website
  socket.on("join", (user) => {
    socket.join(user);

    // Add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      console.log(`User ${user} is now online`);
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    // Send online users to frontend
    io.emit("get-online-users", onlineUsers);

    // Send socket id
    io.emit("setup socket", socket.id);
  });

  // Socket disconnect
  socket.on("disconnect", () => {
    const disconnectedUser = onlineUsers.find(
      (user) => user.socketId === socket.id
    );
    if (disconnectedUser) {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log("User has just disconnected");

      io.emit("user-disconnected", disconnectedUser.userId);
      io.emit(
        "get-online-users",
        onlineUsers.map((user) => user.userId)
      );
    }
  });

  // Joins conversation
  socket.on("join_conversation", (conversation) => {
    socket.join(conversation);
  });

  // Send/receive message
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
    console.log("Typing...", conversation);
    socket.in(conversation).emit("typing");
  });

  socket.on("stopTyping", (conversation) => {
    console.log("Stop typing...", conversation);
    socket.in(conversation).emit("stopTyping");
  });
});

// ============== Error Handling ============== //
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
// ============================================= //
