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
app.use(cors({ origin: "https://kampung-cloud-prod.web.app" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/requests", requestRouter);
app.use("/comments", commentRouter);

module.exports = app;
