import { useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import "@/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "@/pages/Dashboard/Dashboard.page";
import File from "@/pages/File/File.page";
import Login from "@/pages/Login/Login.page";
import Prospect from "@/pages/Prospect/Prospect.page";
import Admin from "@/pages/Admin/Admin.page";
import { ToastContainer } from "react-toastify";

const App = () => (
  <>
    <ToastContainer />
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/file" component={File} />
      <Route path="/prospect" component={Prospect} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  </>
);

export default App;
