import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import "regenerator-runtime/runtime";
import commentRouter from "./routes/commentRouter";
import feedbackRouter from "./routes/feedbackRouter";
import indexRouter from "./routes/index";
import requestRouter from "./routes/requestRouter";
import userRouter from "./routes/userRouter";

var app = express();
var whitelist = [
  "https://kampungcloud.web.app",
  "https://kampungcloud.firebaseapp.com",
];
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", cors(corsOptions), indexRouter);
app.use("/users", cors(corsOptions), userRouter);
app.use("/requests", cors(corsOptions), requestRouter);
app.use("/comments", cors(corsOptions), commentRouter);
app.use("/feedback", cors(corsOptions), feedbackRouter);

module.exports = app;
