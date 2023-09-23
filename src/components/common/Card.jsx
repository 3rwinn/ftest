import React from "react";

function Card({ children }) {
  return (
    <div className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
      {children}
    </div>
  );
}

export default Card;
