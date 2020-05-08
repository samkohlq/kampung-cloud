import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import "regenerator-runtime/runtime";
var commentRouter = require("./routes/commentRouter");
var requestRouter = require("./routes/requestRouter");
var userRouter = require("./routes/userRouter");

var app = express();
var corsOptions = {
  origin: "https://kampung-cloud-prod.web.app",
  optionsSuccessStatus: 200,
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", cors(corsOptions), userRouter);
app.use("/requests", cors(corsOptions), requestRouter);
app.use("/comments", cors(corsOptions), commentRouter);

module.exports = app;
