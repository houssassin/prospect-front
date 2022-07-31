import Tableline from "./Tableline.component";

import BTable from "react-bootstrap/Table";

import "./Table.widget.css";

const Table = (props) => {
  return (
    <BTable>
      <thead>
        <tr>
          {props.lines[0].map((elem, i) => (
            <th key={i}>{elem}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.lines.slice(1, -1).map((line, i) => (
          <Tableline key={i} line={line} />
        ))}
      </tbody>
    </BTable>
  );
};

export default Table;
