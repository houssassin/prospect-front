import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Stats from "./widgets/Stats.widget";
import Files from "./widgets/Files.widget";
import Search from "./widgets/Search.widget";

import Signout from "./components/Signout.component";

import "./Dashboard.page.css";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const [perm, setPerm] = useState("user");
  const history = useHistory();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setPerm(window.localStorage.getItem("perm") ?? "user");
    if (!token)
      history.push("/login", {
        err: "Not currently signed in, please sign in",
      });
    if (!!history.location.state && !!history.location.state.err)
      toast.error(history.location.state.err, {
        position: "top-center",
        theme: "dark",
      });
    if (!!history.location.state && !!history.location.state.success)
      toast.success(history.location.state.success, {
        position: "top-center",
        theme: "dark",
      });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <div id="header" className="flex w-100">
        {perm === "admin" && (
          <Link to="/admin">
            <Button className="mr-auto">Open Perm panel</Button>
          </Link>
        )}
        <Signout className="ml-auto" />
      </div>
      <div id="dashboard">
        <Stats />
        <Files />
      </div>
    </div>
  );
};

export default Dashboard;
