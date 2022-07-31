import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

const Stats = () => {
  const [file, setFile] = useState(null);

  const inputRef = useRef(null);

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

  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles([
      "qsdqsd.csv",
      "Kamil.csv",
      "Yassine.csv",
      "important.csv",
      "qsdqsd.csv",
      "Kamil.csv",
      "Yassine.csv",
      "important.csv",
      "qsdqsd.csv",
      "Kamil.csv",
      "Yassine.csv",
      "important.csv",
      "qsdqsd.csv",
      "Kamil.csv",
      "Yassine.csv",
      "important.csv",
    ]);
  }, []);

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
        <button onClick={handleClick} id="files-button">
          Charger un nouveau fichier
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Stats;
