import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../components/AboutPage/AboutPage";
import CollaboratePage from "../components/CollaboratePage/CollaboratePage";
import Homepage from "../components/Homepage/Homepage";
import PostPage from "../components/PostPage/PostPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/collab" exact component={CollaboratePage} />
      <Route path="/posts/:id" component={PostPage} />
    </Switch>
  );
}
