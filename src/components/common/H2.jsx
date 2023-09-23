import React from "react";

function H2({ children, color = 'text-mde-gray' }) {
  return (
    <h2 className={`font-poppins font-bold text-xl ${color}`}>{children}</h2>
  );
}

export default H2;
