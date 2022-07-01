import { signOutUser } from './../services/authentication';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthenticationContext from '../context/authentication';

const NavContent = ({ mobile, navbarOpen, changeNavbarState }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthenticationContext);

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
      navigate('/');
    });
  };

  const closeMenu = () => {
    changeNavbarState(false);
  };

  const linkList = [
    {
      path: '/',
      text: 'Home',
      id: 1
    },
    {
      path: '/profile/search',
      text: 'Search for Users',
      id: 2
    },
    {
      path: '/sound/search',
      text: 'Search for Sounds',
      id: 3
    }
  ];

  return (
    <ul className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}>
      {linkList.map((link) => (
        <li>
          <NavLink
            key={link.id}
            className="link"
            to={link.path}
            onClick={() => closeMenu()}
            // activeClassName="active-link"
            exact
          >
            {link.text}
          </NavLink>
        </li>
      ))}
      {(user && (
        <>
          <li>
            <NavLink
              className="link"
              to={'/library/list'}
              onClick={() => closeMenu()}
              // activeClassName="active-link"
              exact
            >
              My Libraries
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link"
              to={`/profile/${user._id}`}
              onClick={() => closeMenu()}
              // activeClassName="active-link"
              exact
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link"
              to="/message/list"
              onClick={() => closeMenu()}
              // activeClassName="active-link"
              exact
            >
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link"
              to="/"
              onClick={() => {
                closeMenu();
                handleSignOut();
              }}
              // activeClassName="active-link"
              exact
            >
              Sign Out
            </NavLink>
          </li>
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
        </>
      )}
    </ul>
  );
};

export default NavContent;
