import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import AuthenticationContext from '../context/authentication';
import { signOutUser } from './../services/authentication';

const Navbar = () => {
  const { user, setUser } = useContext(AuthenticationContext);

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
    });
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {(user && (
        <>
          <Link to="/sound-create">Upload New Sound</Link>
          <span>Welcome {user.name}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )) || (
        <>
          <Link to="/log-in">Log In</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
