import React from "react";
import { FaChartPie } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import { RiCloseCircleFill, RiInformationFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import colors from "../../constants/colors";

function MenuItem({
  title = "Accueil",
  active = false,
  icon,
  isLastItem = false,
  onClick,
}) {
  const getIcon = (n) => {
    switch (n) {
      case "dashboard":
        return (
          <FaChartPie
            size={40}
            color={active ? colors.secondary : colors.primary}
          />
        );
      case "evaluation":
        return (
          <HiClipboardList
            size={40}
            color={active ? colors.secondary : colors.primary}
          />
        );
      case "logout":
        return (
          <RiCloseCircleFill
            size={40}
            color={active ? colors.secondary : colors.primary}
          />
        );
      case "qcm":
        return (
          <MdQuiz
            size={40}
            color={active ? colors.secondary : colors.primary}
          />
        );
      default:
        return (
          <RiInformationFill
            size={40}
            color={active ? colors.secondary : colors.primary}
          />
        );
    }
  };

  const menuIcon = getIcon(icon);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full h-auto ${
        !isLastItem && "mb-5 pb-5 border-b-2"
      }`}
    >
      <div className="flex flex-col items-center">
        {menuIcon}
        <div className="mt-2 text-center">
          <span
            className={`font-poppins font-semibold ${
              active ? "text-mde-yellow" : "text-mde-gray"
            }`}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
