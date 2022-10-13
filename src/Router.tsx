import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./page/Home/Home";

function Router() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
