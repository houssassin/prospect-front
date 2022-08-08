import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { getLines } from "@/api";

import Table from "./Table/Table.widget";

import "./File.page.css";
import { Link } from "react-router-dom";

const File = () => {
  const history = useHistory();
  const [lines, setLines] = useState([[]]);
  useEffect(() => {
    const fetchData = async () => {
      if (!history.location.state || !history.location.state.file)
        history.push("/dashboard");
      const data = await getLines(history.location.state.file).catch((err) =>
        alert(err)
      );
      setLines(data);
    };
    fetchData();
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
