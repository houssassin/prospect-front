// 0 --> Pas d'état
// 1 --> Intéressé
// 2 --> En cours de discussion
// 3 --> Pas intéressé
// 4 --> Injoignable

const status = [
  {
    status: "Non joint",
    color: "white",
  },
  {
    status: "Intéressé",
    color: "green",
  },
  {
    status: "En cours de discussion",
    color: "orange",
  },
  {
    status: "Pas intéressé",
    color: "red",
  },
  {
    status: "Injoignable",
    color: "blue",
  },
];

const Tableline = (props) => {
  const line = props.line ?? {};
  if (line.Etat === undefined || line.Commentaire === undefined) return <></>;
  return (
    <tr style={{ backgroundColor: `var(--${status[line.Etat].color})` }}>
      {Object.values(line)
        .slice(0, -2)
        .map((elem, i) => (
          <td style={{ textAlign: "center" }} key={i}>
            {elem}
          </td>
        ))}
      <td style={{ textAlign: "center" }}>{status[line.Etat].status}</td>
      <td style={{ textAlign: "center" }}>
        {line.Commentaire || "Pas encore prospecté"}
      </td>
    </tr>
  );
};

export default Tableline;
