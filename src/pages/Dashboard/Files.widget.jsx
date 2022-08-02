import { useEffect, useState, useRef } from "react";

import { getFiles, sendFileAPI } from "@/api";

import { Link } from "react-router-dom";

const Stats = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const inputRef = useRef(null);

  let trigger = true;

  useEffect(() => {
    const fetchData = async () => {
      const files = await getFiles();
      setFiles(files);
    };
    fetchData().catch((err) => alert(err));
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
    trigger = !trigger;
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
