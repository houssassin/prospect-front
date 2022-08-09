import { useState } from "react";

import Info from "./Info.widget";
import Checkbox from "./Checkbox.widget";
import Comment from "./Comment.widget";

import "./Prospect.page.css";

const Prospect = () => {
  const [radioValue, setRadioValue] = useState(1);
  const [comment, setComment] = useState("");

  const nextProspect = (event) => {
    event.preventDefault();
    console.log("fired");
  };

  return (
    <div id="prospect">
      <Info nextProspect={nextProspect} />
      <Checkbox radioValue={radioValue} setRadioValue={setRadioValue} />
      <Comment comment={comment} setComment={setComment} />
    </div>
  );
};

export default Prospect;
