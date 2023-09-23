import React from "react";

function H3({ children, color = "text-mde-gray" }) {
  return (
    <h3 className={`font-poppins font-bold text-lg ${color}`}>{children}</h3>
  );
}

export default H3;
