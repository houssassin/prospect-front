import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

import Table from "./Table/Table.widget";

import "./File.page.css";
import { Link } from "react-router-dom";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const File = () => {
  const history = useHistory();
  const [lines, setLines] = useState([[]]);
  useEffect(() => {
    if (!history.location.state || !history.location.state.file)
      history.push("/dashboard");
    const token = window.localStorage.getItem("token");
    if (!token)
      history.push("/login", { err: "You have no session please connect" });

    fetch(URL + "/load", {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: history.location.state.file }),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (res.success) setLines(res.data);
        else throw new Error(res.message);
      })
      .catch((err) => {
        if (err.message === "Unauthorized")
          history.push("/login", {
            err: "Your session has expired please reconnect",
          });
        else
          toast.error(err.message, { theme: "dark", position: "top-center" });
      });
  }, []);

  return (
    <div id="file">
      <h2 id="file-title">
        {history.location.state.file ?? "Couldn't find file"}
      </h2>
      <div id="table">
        <Table lines={lines} />
      </div>
      <div className="center">
        <Link
          id="prospect-start"
          style={{ color: "#FFF" }}
          className="btn btn-dark"
          to={{
            pathname: "/prospect",
            state: { file: history.location.state.file ?? null },
          }}
        >
          Commencer la prospection
        </Link>
      </div>
    </div>
  );
};

export default File;
