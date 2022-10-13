import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./page/Login/Login";
import SignUp from "./page/SignUp/SignUp";

function Router() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
