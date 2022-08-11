import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Info from "./Info.widget";
import Checkbox from "./Checkbox.widget";
import Comment from "./Comment.widget";

import "./Prospect.page.css";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const Prospect = () => {
  const [fileName, setFileName] = useState("");
  const [radioValue, setRadioValue] = useState(0);
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);

  const [count, setCount] = useState(0);

  const history = useHistory();
  useEffect(() => {
    if (!history.location.state || !history.location.state.file)
      history.push("/dashboard", { err: "No file selected, try again" });
    setFileName(history.location.state.file);
  }, [count]);

  const nextProspect = (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (!token)
      history.push("/login", { err: "You are not authentified, please login" });
    if (!radioValue)
      return toast.error("Please select a status", {
        theme: "dark",
        position: "top-center",
      });
    fetch(URL + "/nextprospect", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ fileName, index, comment, status: radioValue }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          setCount(count + 1);
        } else throw new Error(res.message);
      })
      .catch((err) => {
        if (err.message === "Unauthorized")
          history.push("/login", { err: err.message });
        else
          toast.error(err.message, { theme: "dark", position: "top-center" });
      });
  };

  return (
    <div id="prospect">
      <Info {...{ nextProspect, setIndex, count }} />
      <Checkbox radioValue={radioValue} setRadioValue={setRadioValue} />
      <Comment comment={comment} setComment={setComment} />
    </div>
  );
};

export default Prospect;
