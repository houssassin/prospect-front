import Stats from "./Stats.widget";
import Files from "./Files.widget";
import Search from "./Search.widget";

import Signout from "./Signout.component";

import "./Dashboard.page.css";

const Dashboard = () => (
  <div className="flex flex-col justify-center items-center">
    <Signout />
    <div id="dashboard">
      <Stats />
      <Files />
      <Search />
    </div>
  </div>
);

export default Dashboard;
