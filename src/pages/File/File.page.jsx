import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

import Table from "./Table/Table.widget";

import { Form } from "react-bootstrap";

import "./File.page.css";
import { Link } from "react-router-dom";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const searchMap = {
  "Par nom": "Nom",
  "Par établissement d'origine": "Etablissement",
};

const File = () => {
  const history = useHistory();

  const [data, setData] = useState([[]]);

  const [lines, setLines] = useState([[]]);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("Par nom");

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
        if (res.success) {
          setData(res.data);
          setLines(res.data);
        } else throw new Error(res.message);
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

  useEffect(() => {
    const regex = new RegExp(`\\b${search}`, "i");
    setLines(data.filter((line) => regex.test(line[searchMap[searchOption]])));
  }, [search, searchOption]);

  return (
    <div id="file">
      <h2 id="file-title">
        {history.location.state.file ?? "Couldn't find file"}
      </h2>
      <Form.Group className="flex" style={{ marginBottom: "1rem" }}>
        <Form.Control
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={searchOption}
          className="w-50"
        />
        <Form.Select
          onChange={(event) => setSearchOption(event.target.value)}
          value={searchOption}
          className="w-50"
        >
          {Object.keys(searchMap).map((elem, i) => (
            <option key={i}>{elem}</option>
          ))}
        </Form.Select>
      </Form.Group>
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
