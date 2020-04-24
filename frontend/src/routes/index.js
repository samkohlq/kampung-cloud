import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../components/Homepage/Homepage";
import PostPage from "../components/PostPage/PostPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/posts/:id" component={PostPage} />
    </Switch>
  );
}
