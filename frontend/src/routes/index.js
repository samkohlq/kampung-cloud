import React from "react";
import { Route, Switch } from "react-router-dom";
import CollaboratePage from "../components/CollaboratePage/CollaboratePage";
import GettingStartedPage from "../components/GettingStartedPage/GettingStartedPage";
import Homepage from "../components/Homepage/Homepage";
import MyRequestsPage from "../components/MyRequestsPage/MyRequestsPage";
import PostPage from "../components/PostPage/PostPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/getting-started" exact component={GettingStartedPage} />
      <Route path="/collab" exact component={CollaboratePage} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/my-requests/" component={MyRequestsPage} />
    </Switch>
  );
}
