import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import AuthenticationContext from '../context/authentication';
import { signOutUser } from './../services/authentication';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, setUser } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
      navigate('/');
    });
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile/search">Search for Profiles</Link>
      <Link to="/sound/search">Search for Sound</Link>
      {(user && (
        <>
          <Link to="/message/list">Messages</Link>
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
