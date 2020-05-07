import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import App from "./App";
import "./main.css";

WebFont.load({
  google: {
    families: ["DM Serif Display", "serif"],
  },
});

ReactDOM.render(<App />, document.getElementById("root"));
