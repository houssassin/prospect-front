import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const Stats = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const history = useHistory();

  const inputRef = useRef(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) history.push("/login", { err: "No session, please connect" });
    fetch(URL + "/getfiles", {
      method: "POST",
      headers: { Authorization: token },
    })
      .then((data) => data.json())
      .then((res) =>
        !res.success ? history.push("/login", { err: res.message }) : res.data
      )
      .then((data) => setFiles(data));
  }, [file]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = null;
    setFile(fileObj);
  };

  const sendFile = async () => {
    await sendFileAPI(file).catch((err) => alert(err));
    setFile(null);
    setTrigger(!trigger);
  };

  return (
    <div className="widget">
      <h3 className="widget-title">Fichiers</h3>
      <div id="files">
        {files.map((elem, i) => (
          <Link key={i} to={{ pathname: "/file", state: { file: elem } }}>
            <p>{elem}</p>
          </Link>
        ))}
      </div>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      {!file ? (
        <button onClick={handleClick} className="mt-auto">
          Charger un nouveau fichier
        </button>
      ) : (
        <div style={{ display: "flex" }} className="mt-auto">
          <button
            className="btn-success"
            onClick={sendFile}
            style={{ marginRight: "auto" }}
          >
            Upload
          </button>
          <button
            className="btn-dark"
            onClick={() => setFile(null)}
            style={{ marginLeft: "auto" }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Stats;
