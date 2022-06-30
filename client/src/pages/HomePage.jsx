import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SoundMap from './../components/SoundMap';
import { soundList } from '../services/sound';
import { useNavigate } from 'react-router-dom';
import SoundCard from '../components/SoundCard';

const HomePage = () => {
  const [filters, setFilters] = useState({
    lat: 38.75,
    lng: -9.25,
    distance: 1
  });

  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    soundList().then((sounds) => setSounds(sounds.data));
  }, []);

  const handleMapMove = (lat, lng, distance) => {
    setFilters({ ...filters, lat, lng, distance });
  };

  return (
    <div>
      <header>
        <h1>Audity</h1>
      </header>

      <div>
        {/* <div className="map-container">MAP</div> */}
        <SoundMap sounds={sounds} onMove={handleMapMove} />
      </div>
      {/* <SoundCard sounds={sounds} /> */}
      <div>PLAYER</div>
      <h2>Welcome to Audity. Create an account and listen to your city.</h2>
      <Link to={'/register'}>Register</Link>
      <Link to={'/log-in'}>Sign in</Link>
      <footer>Lorem ipsum dolor sit amet</footer>
    </div>
  );
};

export default HomePage;
