import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

function Avatar({ url = null, size = 10, alt = "avatar" }) {
  const getSize = (s) => {
    switch (s) {
      case 10:
        return "h-10 w-10";
      case 12:
        return "h-12 w-12";
      case 14:
        return "h-14 w-14";
      case 16:
        return "h-16 w-16";
      default:
        return "h-10 w-10";
    }
  };

  const imgSize = getSize(size);
  return (
    <>
      {url === null || url === undefined ? (
        <UserCircleIcon className={`text-mde-gray ${imgSize}`} />
      ) : (
        <div className={imgSize}>
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src={url}
            alt={alt}
          />
        </div>
      )}
    </>
  );
}

export default Avatar;
