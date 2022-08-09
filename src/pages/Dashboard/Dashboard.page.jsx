import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Stats from "./Stats.widget";
import Files from "./Files.widget";
import Search from "./Search.widget";

import Signout from "./Signout.component";

import "./Dashboard.page.css";

const Dashboard = () => {
  const history = useHistory();
  useEffect(() => {
    if (!!history.location.state && !!history.location.state.err)
      toast.error(history.location.state.err, {
        position: "top-center",
        theme: "dark",
      });
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <Signout />
      <div id="dashboard">
        <Stats />
        <Files />
        <Search />
      </div>
    </div>
  );
};

export default Dashboard;
