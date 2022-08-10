import { useState } from "react";
import { ToggleButton, ButtonGroup } from "react-bootstrap";

const Checkbox = (props) => {
  const { radioValue, setRadioValue } = props;

  const radios = [
    { name: "Intéressé", value: 1, variant: "outline-success" },
    { name: "En cours de discussion", value: 2, variant: "outline-warning" },
    { name: "Non intéressé", value: 3, variant: "outline-danger" },
    { name: "Injoignable", value: 4, variant: "outline-primary" },
  ];

  return (
    <div className="pwidget" id="checkbox">
      <ButtonGroup id="checkbox-grp">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={radio.variant}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default Checkbox;
