import React from "react";

function H1({ children, color = "text-mde-red" }) {
  return <h1 className={`font-poppins font-bold text-2xl ${color}`}>{children}</h1>;
}

export default H1;
