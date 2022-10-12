import React, { useState, useEffect } from "react";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [location, setLocation] = useState("");

  const showSidebar = () => setSidebar(!sidebar);

  const locationSetter = () => {
    if (window.location.pathname === "/") {
      setLocation("Home");
    }
    if (window.location.pathname === "/new") {
      setLocation("Add new");
    }
    if (window.location.pathname === "/operations") {
      setLocation("Operations List");
    }
  };

  useEffect(() => {
    locationSetter();
  }, [sidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <HiIcons.HiMenuAlt2 onClick={showSidebar} />
          </Link>
          <div className="location">{location}</div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
