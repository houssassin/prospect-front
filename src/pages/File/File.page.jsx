import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Table from "./Table/Table.widget";

import "./File.page.css";

const File = () => {
  const history = useHistory();
  const [lines, setLines] = useState([[]]);
  useEffect(() => {
    if (!history.location.state || !history.location.state.file)
      history.push("/dashboard");
    const data = [
      ["Nom", "Prénom", "Age", "Formation", "Etablissement actuel", "Statut"],
    ];
    for (let index = 0; index < 100; index++) {
      data.push(["Foulan", "Flann", "19 ans", "Bac+1", "Henri le petit", null]);
    }
    setLines(data);
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
        <button id="prospect-start">Commencer la prospection</button>
      </div>
    </div>
  );
};

export default File;
