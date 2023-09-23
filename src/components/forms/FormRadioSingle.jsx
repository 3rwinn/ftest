import React from "react";

function FormRadioSingle({
  id,
  name,
  choice,
  label,
  sideEvent,
  previousChecking,
}) {
  const [isChecked, setIsChecked] = React.useState(previousChecking);
  const handleChange = (e, choice, label) => {
    setIsChecked(e.target.value);
    sideEvent(e, choice, label);
  };
  return (
    <input
      onChange={(e) => handleChange(e, choice, label)}
      id={id}
      name={name}
      value={choice.value}
      type="radio"
      className="focus:ring-mde-yellow h-4 w-4 text-mde-yellow border-gray-300"
      checked={isChecked === choice.value}
    />
  );
}

export default FormRadioSingle;
 