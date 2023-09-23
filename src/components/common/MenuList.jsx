import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useLocation, useNavigate } from "react-router-dom";

function MenuList() {
  let navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setMenuActive(0);
        break;
      case "/evaluations":
        setMenuActive(1);
        break;
      default:
        return;
    }
  }, [location]);

  const [menuActive, setMenuActive] = useState(0);
  const menuDatas = [
    {
      icon: "dashboard",
      title: "Tableau de bord",
      link: "dashboard",
      last: false,
    },
    {
      icon: "evaluation",
      title: "Evaluations",
      link: "evaluations",
      last: false,
    },
    {
      icon: "qcm",
      title: "QCM",
      link: "qcm",
      last: false,
    },
    {
      icon: "infos",
      title: "Informations",
      link: "infos",
      last: true,
    },
  ];

  return (
    <div>
      {menuDatas.map((item, index) => (
        <MenuItem
          icon={item.icon}
          title={item.title}
          active={menuActive === index}
          onClick={() => {
            setMenuActive(index);
            navigate(`/${item.link}`, { replace: true });
          }}
          isLastItem={item.last}
        />
      ))}
    </div>
  );
}

export default MenuList;
