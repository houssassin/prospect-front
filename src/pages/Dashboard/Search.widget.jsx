import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

const Search = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(["qsdqsd.csv", "Kamil.csv", "Yassine.csv", "important.csv"]);
  }, []);

  const [searchOption, setSearchOption] = useState("Par nom");
  const [search, setSearch] = useState("");

  return (
    <div className="widget">
      <h3 className="widget-title">Recherche</h3>
      <Form>
        <Form.Group>
          <Form.Select
            onChange={(event) => setSearchOption(event.target.value)}
            value={searchOption}
          >
            <option>Par nom</option>
            <option>Par établissement d'origine</option>
            <option>Un fichier</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchOption}
          />
        </Form.Group>
      </Form>
      <Button style={{ width: "100%", marginTop: "auto" }} variant="dark">
        Rechercher
      </Button>
    </div>
  );
};

export default Search;
