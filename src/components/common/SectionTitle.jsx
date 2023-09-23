import React from "react";
import H4 from "./H4";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

function SectionTitle({ children }) {
  return (
    <div className="flex flex-row items-center mb-4">
      <div className="w-6 h-6 mr-2 flex justify-center items-center rounded-md border-2 border-mde-red text-sm font-bold text-mde-red">
        <ArrowSmRightIcon className="h-4 w-4" />
      </div>
      <H4>{children}</H4>
    </div>
  );
}

export default SectionTitle;
