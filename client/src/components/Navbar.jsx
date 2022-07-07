import { useState } from "react";

import { VscClose } from "react-icons/vsc";
import { AiOutlineMenu } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import "./Navbar.scss";

import NavContent from "./NavContent";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggleMenu = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleCloseMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <nav className="navBar">
      <div id="nav-top" className={navbarOpen ? "fixed-menu" : ""}>
        <Link to={"/"}>
          <h2 onClick={handleCloseMenu}>AUDITY</h2>
        </Link>

        <Link to={"/message/list"} id="nav-message-btn">
          <VscComment
            onClick={handleCloseMenu}
            style={{
              color: "#8941E7",
              width: "32px",
              height: "32px",
            }}
          />
        </Link>

        <button className="toggelBtn" onClick={handleToggleMenu}>
          {navbarOpen ? (
            <VscClose
              style={{ color: "#8941E7", width: "32px", height: "32px" }}
            />
          ) : (
            <AiOutlineMenu
              style={{ color: "#8941E7", width: "32px", height: "32px" }}
            />
          )}
        </button>
      </div>

      <div className="desktop">
        <NavContent
          mobile={false}
          navbarOpen={navbarOpen}
          changeNavbarState={setNavbarOpen}
        />
      </div>

      <div className="mobile">
        <NavContent
          mobile={true}
          navbarOpen={navbarOpen}
          changeNavbarState={setNavbarOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
