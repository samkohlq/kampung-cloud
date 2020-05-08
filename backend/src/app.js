import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import "regenerator-runtime/runtime";

var app = express();

app.use(logger("dev"));
app.use(cors({ origin: "https://kampung-cloud-prod.web.app" }));

var commentRouter = require("./routes/commentRouter");
var requestRouter = require("./routes/requestRouter");
var userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/requests", requestRouter);
app.use("/comments", commentRouter);

module.exports = app;
