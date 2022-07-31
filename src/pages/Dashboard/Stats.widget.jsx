import { useEffect, useState } from "react";

const Stats = () => {
  const [interested, setInterested] = useState(0);
  const [noninterested, setNonInterested] = useState(0);
  const [contacts, setContacts] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    // fetch les interested, non interested...
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
