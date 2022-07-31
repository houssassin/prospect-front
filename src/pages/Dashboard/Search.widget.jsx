import { useEffect, useState } from "react";

const Search = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(["qsdqsd.csv", "Kamil.csv", "Yassine.csv", "important.csv"]);
  }, []);
  return (
    <div className="widget">
      <h3 className="widget-title">Recherche</h3>
    </div>
  );
};

export default Search;
