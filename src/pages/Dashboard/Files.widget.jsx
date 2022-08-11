import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

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
    if (!token)
      history.push("/login", {
        err: "Not currently signed in, please sign in",
      });
    fetch(URL + "/getfiles", {
      method: "POST",
      headers: { Authorization: token },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) setFiles(res.data);
        else throw new Error(res.message);
      })
      .catch((err) => {
        if ((err.message = "Unauthorized"))
          history.push("/login", { err: err.message });
        else
          toast.error("Failed to fetch, please try again", {
            position: "bottom-center",
            theme: "dark",
          });
      });
  }, []);

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

  const sendFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file, file.name);
    fetch(URL + "/upload", {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then(({ success, message }) => {
        if (success) {
          console.log(success);
          setFile(null);
          setTrigger(!trigger);
          toast.success("Succesfully uploaded file !", {
            theme: "dark",
            position: "bottom-center",
          });
        } else throw new Error(message);
      })
      .catch((err) => {
        console.log("triggered");
        toast.error(err.message, {
          theme: "dark",
          position: "bottom-center",
        });
      });
  };

  return (
    <>
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
          <Button onClick={handleClick} className="mt-auto big-btn primary-bg">
            Charger un nouveau fichier
          </Button>
        ) : (
          <div style={{ display: "flex" }} className="mt-auto">
            <Button
              variant="success"
              onClick={sendFile}
              className="big-btn mr-auto"
            >
              Upload
            </Button>
            <Button
              variant="dark"
              onClick={() => setFile(null)}
              className="big-btn ml-auto"
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Stats;
