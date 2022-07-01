import { useState } from "react";
import "./Navbar.scss";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import NavContent from "./NavContent";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggleMenu = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="navBar">
      <button className="toggelBtn" onClick={handleToggleMenu}>
        {navbarOpen ? (
          <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
        ) : (
          <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
        )}
      </button>
      <div className="mobile">
        <NavContent
          mobile={true}
          navbarOpen={navbarOpen}
          changeNavbarState={setNavbarOpen}
        />
      </div>
      <div className="desktop">
        <NavContent
          mobile={false}
          navbarOpen={navbarOpen}
          changeNavbarState={setNavbarOpen}
        />
      </div>
      <h1>AUDITY</h1>
    </nav>
  );
};

export default Navbar;
