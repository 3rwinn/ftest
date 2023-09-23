import React from "react";

function H4({ children, color = "text-mde-gray" }) {
  return (
    <h4 className={`font-poppins font-bold text-base ${color}`}>{children}</h4>
  );
}

export default H4;
