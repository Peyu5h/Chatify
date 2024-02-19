import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import routes from "./routes/index.js";

import createHttpError from "http-errors";

dotenv.config();

const app = express();

// ================== MIDDLEWARES ================== //
{
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
  app.use(cors()); //enable cors
}
// ============================================== //
app.use("/api/v1", routes);

//=============== error handling  ===============//
{
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
    next(createHttpError.NotFound("This route does not exist"));
  });
}
// ============================================ //

export default app;
