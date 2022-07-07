import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SoundMap from './../components/SoundMap';
import SoundCard from './../components/SoundCard';
import { soundList } from '../services/sound';
import { useContext } from 'react';
import AuthenticationContext from '../context/authentication';
import './HomePage.scss';

const HomePage = () => {
  const [filters, setFilters] = useState({
    lat: 38.75,
    lng: -9.25,
    distance: 1
  });

  const [sounds, setSounds] = useState([]);

  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    soundList().then((sounds) => {
      setSounds(sounds.data);
    });
  }, []);

  const handleMapMove = (lat, lng, distance) => {
    setFilters({ ...filters, lat, lng, distance });
  };

  return (
    <div className="home-page">
      {sounds && (
        <>
          <SoundMap sounds={sounds} onMove={handleMapMove} />

          <SoundCard
            sound={sounds[Math.floor(Math.random() * (sounds.length - 1))]}
          />
        </>
      )}
      <section>
        <h3>Welcome to Audity. Create an account and listen to your city.</h3>
        {!user && (
          <div className="link-wrapper">
            <Link to={'/register'} className="btn">
              Register
            </Link>
            <Link to={'/log-in'} className="btn">
              Sign in
            </Link>
          </div>
        )}
      </section>
      {/* <footer>Lorem ipsum dolor sit amet</footer> */}
    </div>
  );
};

export default HomePage;
