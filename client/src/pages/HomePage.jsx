import { Link, Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SoundMap from './SoundMap';
import { soundList } from '../services/sound';
import GenericMap from './GenericMap';
import { Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [filters, setFilters] = useState({
    lat: 38.75,
    lng: -9.25,
    distance: 1
  });

  const navigate = useNavigate();

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
        <SoundMap
          sounds={sounds}
          onMove={handleMapMove}
          /* {sounds.map((sound) => (
            <Marker
              key={sound._id}
              position={{
                lat: sound.position.coordinates[1],
                lng: sound.position.coordinates[0]
              }}
              onClick={() => navigate(`/sound/${sound._id}`)}
            />
          ))}  */
        />
      </div>
      <div>PLAYER</div>
      <h2>Welcome to Audity. Create an account and listen to your city.</h2>
      <Link to={'/register'}>Register</Link>
      <Link to={'/log-in'}>Sign in</Link>
      <footer>Lorem ipsum dolor sit amet</footer>
    </div>
  );
};

export default HomePage;
