import Stats from "./Stats.widget";
import Files from "./Files.widget";
import Search from "./Search.widget";

import "./Dashboard.page.css";

const Dashboard = () => (
  <div id="dashboard">
    <Stats />
    <Files />
    <Search />
  </div>
);

export default Dashboard;
