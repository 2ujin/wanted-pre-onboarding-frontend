import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./page/Login/Login";
import NotFound from "./page/NotFound/404";
import SignUp from "./page/SignUp/SignUp";
import Todo from "./page/Todo/Todo";

function Router() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/todo" component={Todo} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
