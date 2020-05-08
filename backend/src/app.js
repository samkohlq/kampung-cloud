import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import "regenerator-runtime/runtime";
import commentRouter from "./routes/commentRouter";
import requestRouter from "./routes/requestRouter";
import userRouter from "./routes/userRouter";

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://kampung-cloud-prod.web.app"
  );
  // request methods to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // request headers to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use("/users", userRouter);
app.use("/requests", requestRouter);
app.use("/comments", commentRouter);

module.exports = app;
