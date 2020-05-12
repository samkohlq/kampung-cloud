import React from "react";
import { Route, Switch } from "react-router-dom";
import ContactUsPage from "../components/ContactUsPage.jsx/ContactUsPage";
import Homepage from "../components/Homepage/Homepage";
import HowItWorksPage from "../components/HowItWorksPage/HowItWorksPage";
import Profile from "../components/ProfilePage/ProfilePage";
import RequestPage from "../components/RequestPage/RequestPage";
import Requests from "../components/RequestsPage/RequestsPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/how-this-kampung-works" exact component={HowItWorksPage} />
      <Route path="/requests/:id" component={RequestPage} />
      <Route path="/my-requests" component={Requests} />
      <Route path="/my-profile" component={Profile} />
      <Route path="/contact-us" component={ContactUsPage} />
    </Switch>
  );
}
