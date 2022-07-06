import { signOutUser } from "./../services/authentication";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthenticationContext from "../context/authentication";

const NavContent = ({ mobile, navbarOpen, changeNavbarState }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthenticationContext);

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
      navigate("/");
    });
  };

  const closeMenu = () => {
    changeNavbarState(false);
  };

  const linkList = [
    /*     {
      path: '/',
      text: 'Audity',
      id: 1
    }, */
    {
      path: "/profile/search",
      text: "Search for Users",
      id: 2,
    },
    {
      path: "/sound/search",
      text: "Search for Sounds",
      id: 3,
    },
  ];

  return (
    <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
      {mobile && <hr />}
      {!mobile && (
        <li>
          <NavLink
            className="link"
            to={"/"}
            // activeClassName="active-link"
          >
            AUDITY
          </NavLink>
        </li>
      )}
      {linkList.map((link) => (
        <li key={link.id}>
          <NavLink
            className="link"
            to={link.path}
            onClick={() => closeMenu()}
            // activeClassName="active-link"
          >
            {link.text}
          </NavLink>
          {mobile && <hr />}
        </li>
      ))}
      {(user && (
        <>
          <li>
            <NavLink
              className="link"
              to={"/sound-create"}
              onClick={() => closeMenu()}
              // activeClassName="active-link"
            >
              Create Sound
            </NavLink>
          </li>
          {mobile && <hr />}
          <li>
            <NavLink
              className="link"
              to={"/library/my-libraries"}
              onClick={() => closeMenu()}
              // activeClassName="active-link"
            >
              Libraries
            </NavLink>
          </li>
          {mobile && <hr />}
          {!mobile && (
            <li>
              <NavLink
                className="link"
                to={"/message/list"}
                // activeClassName="active-link"
              >
                Messages
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              className="link"
              to={`/profile/${user._id}`}
              onClick={() => closeMenu()}
              // activeClassName="active-link"
            >
              {user.name}'s Profile
            </NavLink>
          </li>
          {mobile && <hr />}
          {/*     <li>
            <NavLink
              className="link"
              to="/message/list"
              onClick={() => closeMenu()}
              // activeClassName="active-link"
            >
              Messages
            </NavLink>
          </li> */}
          <li>
            <NavLink
              className="link"
              to="/"
              onClick={() => {
                closeMenu();
                handleSignOut();
              }}
              // activeClassName="active-link"
            >
              Sign Out
            </NavLink>
          </li>
          {mobile && <hr />}
        </>
      )) || (
        <>
          <li>
            <NavLink
              className="link"
              to="/log-in"
              onClick={() => closeMenu()}
              // activeClassName="active-link"
            >
              Log In
            </NavLink>
          </li>
          {mobile && <hr />}
          <li>
            <NavLink
              className="link"
              to="/register"
              onClick={() => closeMenu()}
              // activeClassName="active-link"
            >
              Register
            </NavLink>
          </li>
          {mobile && <hr />}
        </>
      )}
    </ul>
  );
};

export default NavContent;
