import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import "regenerator-runtime/runtime";
import commentRouter from "./routes/commentRouter";
import indexRouter from "./routes/index";
import requestRouter from "./routes/requestRouter";
import userRouter from "./routes/userRouter";

var app = express();
var corsOptions = {
  origin: "https://kampung-cloud-prod.web.app",
  methods: ["GET", "PUT", "POST"],
  optionsSuccessStatus: 200,
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", cors(corsOptions), userRouter);
app.use("/requests", cors(corsOptions), requestRouter);
app.use("/comments", cors(corsOptions), commentRouter);

module.exports = app;
