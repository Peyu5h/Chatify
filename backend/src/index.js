import app from "./app.js";
import logger from "./configs/logger.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const mongoUrl = process.env.DATABASE_URL;

console.log("mode = " + process.env.NODE_ENV);

// ============== MongoDB Connection ============== //
mongoose
  .connect(mongoUrl, {
    autoIndex: false,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(error.message);
  });

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}
// ================================================= //

let server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
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
