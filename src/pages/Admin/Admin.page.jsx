import Perms from "./Perms.widget";
import Role from "./Role.widget";

import "./Admin.page.css";
import { useEffect, useState } from "react";

const URL = import.meta.env.URL ?? "http://localhost:8080";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [roles, setRoles] = useState({});
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token)
      history.push("/login", {
        err: "Not currently signed in, please sign in",
      });
    fetch(URL + "/getadmin", {
      method: "POST",
      headers: { Authorization: token },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res.data);
        if (res.success) {
          setUsers(res.data.users);
          setFiles(res.data.files);
          setRoles(res.data.roles);
        } else throw new Error(res.message);
      });
  }, [refresh]);
  console.log();
  return (
    <div id="admin">
      <Perms {...{ users, refresh, setRefresh }} />
      <Role {...{ users, files, roles, refresh, setRefresh }} />
    </div>
  );
};

export default Admin;
