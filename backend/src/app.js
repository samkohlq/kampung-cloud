import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
// import postRouter from "./routes/postRouter";
import userRouter from "./routes/userRouter";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
// app.use("/posts", postRouter);

module.exports = app;
