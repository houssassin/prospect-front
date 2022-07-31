const Tableline = (props) => {
  const line = props.line ?? [];
  return (
    <tr>
      {line.map((elem, i) => (
        <td key={i}>{elem}</td>
      ))}
    </tr>
  );
};

export default Tableline;
