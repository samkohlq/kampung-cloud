import React from "react";
import { Route, Switch } from "react-router-dom";
import GettingStartedPage from "../components/GettingStartedPage/GettingStartedPage";
import Homepage from "../components/Homepage/Homepage";
import PostPage from "../components/PostPage/PostPage";
import Profile from "../components/ProfilePage/ProfilePage";
import Requests from "../components/RequestsPage/RequestsPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/getting-started" exact component={GettingStartedPage} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/my-requests/" component={Requests} />
      <Route path="/my-profile/" component={Profile} />
    </Switch>
  );
}
