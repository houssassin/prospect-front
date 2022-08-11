import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const Stats = () => {
  const [interested, setInterested] = useState(0);
  const [noninterested, setNonInterested] = useState(0);
  const [contacts, setContacts] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token)
      history.push("/login", {
        err: "Not currently signed in, please sign in",
      });
    fetch(URL + "/getstats", {
      method: "POST",
      headers: { Authorization: token },
    })
      .then((data) => data.json())
      .then((res) => {
        if (!res.success) throw new Error("Failed to fetch");
        setInterested(res.data["interested"]);
        setNonInterested(res.data["noninterested"]);
        setContacts(res.data["contacts"]);
        setRemaining(res.data["remaining"]);
      })
      .catch((err) =>
        toast.error(err.message, { theme: "dark", position: "top-center" })
      );
  }, []);
  return (
    <div className="widget">
      <h3 className="widget-title">Stats</h3>
      <p>
        <span className="bigger">{interested}</span> personnes intéressées
      </p>
      <p>
        <span className="bigger">{noninterested}</span> personnes non
        intéressées
      </p>
      <p>
        <span className="bigger">{contacts}</span> contacts totaux
      </p>
      <p>
        <span className="bigger">{remaining}</span> personnes non contactées ou
        à contacter
      </p>
    </div>
  );
};

export default Stats;
