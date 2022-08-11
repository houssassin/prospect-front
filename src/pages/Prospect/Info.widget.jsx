import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ListGroup, Button } from "react-bootstrap";

import { toast } from "react-toastify";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const Info = ({ nextProspect, setIndex, count }) => {
  const [info, setInfo] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token)
      history.push("/login", { err: "You have no session, please connect" });
    if (!history.location.state || !history.location.state.file)
      history.push("/dashboard", { err: "You have no file selected" });

    fetch(URL + "/prospect", {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: history.location.state.file }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (!res.success) throw new Error(res.message);
        else {
          if (res.message) history.push("/dashboard", { success: res.message });
          else {
            setInfo(res.data.info);
            setIndex(res.data.index);
          }
        }
      })
      .catch((err) => {
        toast.error(err.message, { position: "top-center", theme: "dark" });
      });
  }, [count]);
  return (
    <div
      className="pwidget flex flex-col items-center justify-center"
      id="info"
    >
      <ListGroup>
        {info &&
          Object.values(info)
            .slice(0, -2)
            .map((elem, i) => (
              <ListGroup.Item key={i} style={{ textAlign: "center" }}>
                {elem}
              </ListGroup.Item>
            ))}
      </ListGroup>
      <div style={{ marginTop: "1rem" }} className="flex">
        <Button onClick={nextProspect} variant="success" className="ml-auto">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Info;
