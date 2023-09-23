import React from "react";

function FormCheckBoxSingle({
  el_id,
  name,
  index,
  sideEvent,
  previousChecking = false,
}) {
  const [isChecked, setIsChecked] = React.useState(previousChecking);
  const handleChange = (event, choix_id) => {
    setIsChecked(!isChecked);
    sideEvent(event, choix_id);
  };
  return (
    <input
      id={`${name}_choix_${index}`}
      aria-describedby={`${name}_choix_${index}_description`}
      name={`${name}_choix_${index}`}
      onChange={(e) => handleChange(e, el_id)}
      type="checkbox"
      className="focus:ring-mde-red h-4 w-4 text-mde-red-700 border-gray-300 rounded"
      checked={isChecked}
    />
  );
}

export default FormCheckBoxSingle;
