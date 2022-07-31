import { Route, Switch, Redirect } from "react-router-dom";

import "@/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "@/pages/Dashboard/Dashboard.page";
import File from "@/pages/File/File.page";

const App = () => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/file" component={File} />
    <Route path="/">
      <Redirect to="/dashboard" />
    </Route>
  </Switch>
);

export default App;
