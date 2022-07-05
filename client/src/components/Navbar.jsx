import { useState } from 'react';
import './Navbar.scss';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import { VscClose } from 'react-icons/vsc';
import { AiOutlineMenu } from 'react-icons/ai';
import { VscComment } from 'react-icons/vsc';
import NavContent from './NavContent';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggleMenu = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="navBar">
      <Link to={'/'}>
        <h2>AUDITY</h2>
      </Link>

      <Link to={'/message/list'} className="nav-link">
        <VscComment
          style={{
            color: '#8941E7',
            width: '32px',
            height: '32px'
          }}
        />
      </Link>

      <button className="toggelBtn" onClick={handleToggleMenu}>
        {navbarOpen ? (
          <VscClose
            style={{ color: '#8941E7', width: '32px', height: '32px' }}
          />
        ) : (
          <AiOutlineMenu
            style={{ color: '#8941E7', width: '32px', height: '32px' }}
          />
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
    </nav>
  );
};

export default Navbar;
