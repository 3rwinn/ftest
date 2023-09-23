import React from "react";
import Button from "./Button";

function PageContent({ title, children, prevActionButton, actionButton }) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>

          <div className="flex space-x-4 items-center">
            <div>{prevActionButton}</div>
            {actionButton && (
              <Button event={actionButton?.event}>{actionButton?.title}</Button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {children === null || children === undefined ? (
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

export default PageContent;
