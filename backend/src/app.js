import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

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

app.use(cors()); //enable cors

// ================== ROUTES ======================= //

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
