import Tableline from "./Tableline.component";

import BTable from "react-bootstrap/Table";

import "./Table.widget.css";

const Table = (props) => {
  return (
    <BTable style={{ margin: "0" }}>
      <thead style={{ borderColor: "var(--darker-white)" }}>
        <tr style={{ backgroundColor: "var(--darker-white)", color: "white" }}>
          {Object.keys(props.lines[0]).map((elem, i) => (
            <th style={{ textAlign: "center" }} key={i}>
              {elem}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.lines.map((line, i) => (
          <Tableline key={i} line={line} />
        ))}
      </tbody>
    </BTable>
  );
};

export default Table;
