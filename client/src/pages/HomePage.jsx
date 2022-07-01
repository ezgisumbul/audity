import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SoundMap from "./../components/SoundMap";
import SoundCard from "./../components/SoundCard";
import { soundList } from "../services/sound";

const HomePage = () => {
  const [filters, setFilters] = useState({
    lat: 38.75,
    lng: -9.25,
    distance: 1,
  });

  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    soundList().then((sounds) => {
      setSounds(sounds.data);
    });
  }, []);

  const handleMapMove = (lat, lng, distance) => {
    setFilters({ ...filters, lat, lng, distance });
  };

  return (
    <div>
      {sounds && (
        <>
          <SoundMap sounds={sounds} onMove={handleMapMove} />
          <SoundCard
            sound={sounds[Math.floor(Math.random() * (sounds.length - 1))]}
          />
        </>
      )}

      <h2>Welcome to Audity. Create an account and listen to your city.</h2>
      <Link to={"/register"}>Register</Link>
      <Link to={"/log-in"}>Sign in</Link>
      <footer>Lorem ipsum dolor sit amet</footer>
    </div>
  );
};

export default HomePage;
