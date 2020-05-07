import React from "react";
import { Route, Switch } from "react-router-dom";
import GettingStartedPage from "../components/GettingStartedPage/GettingStartedPage";
import Homepage from "../components/Homepage/Homepage";
import Profile from "../components/ProfilePage/ProfilePage";
import RequestPage from "../components/RequestPage/RequestPage";
import Requests from "../components/RequestsPage/RequestsPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/getting-started" exact component={GettingStartedPage} />
      <Route path="/requests/:id" component={RequestPage} />
      <Route path="/my-requests/" component={Requests} />
      <Route path="/my-profile/" component={Profile} />
    </Switch>
  );
}
