import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SoundMap from "./../components/SoundMap";
import { soundList } from "../services/sound";
import { useContext } from "react";
import AuthenticationContext from "../context/authentication";
import SoundCardHomePage from "../components/SoundCardHomePage";
import "./HomePage.scss";

const HomePage = () => {
  const [filters, setFilters] = useState({
    lat: 38.75,
    lng: -9.25,
    distance: 1,
  });

  const [sounds, setSounds] = useState([]);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    soundList().then((sounds) => {
      setSounds(sounds.data);
    });
  }, []);

  const handleMapMove = (lat, lng, distance) => {
    setFilters({ ...filters, lat, lng, distance });
  };

  const handleAboutExpand = () => {
    setAboutExpanded(!aboutExpanded);
  };

  return (
    <div className="home-page">
      <section className={aboutExpanded ? "unfolded" : ""}>
        <h3>
          Welcome to Audity. Create an account and listen to your city.
          <span onClick={handleAboutExpand}>
            {aboutExpanded ? "Read less →" : "Read more →"}
          </span>
        </h3>
        <div className={`about-text ${aboutExpanded ? "" : "hide"}`}>
          <p>
            Audity is not just an app, but a collective sound memory. On this
            platform you can upload your field recordings, share them with
            others, or listen to recordings of others and collect them in
            different libraries. On Audity you can network globally: You can
            follow your favorite users and view their sound collections. Use
            tags, keyword search or the interactive map, to find and download
            sounds for your projects! Audity is a low hierarchy platform open to
            all ears - from sound engineers, artists, radio producers to hobby
            sound lovers. Audity's sound topographies grow continuously - as
            does its community. Become part of this collective, artistic and
            non-commercial project now!
          </p>
        </div>
        {!user && (
          <div className="link-wrapper">
            <Link to={"/register"} className="btn">
              Register
            </Link>
            <Link to={"/log-in"} className="btn">
              Sign in
            </Link>
          </div>
        )}
      </section>
      {sounds && (
        <>
          <SoundMap sounds={sounds} onMove={handleMapMove} />

          <SoundCardHomePage
            sound={sounds[Math.floor(Math.random() * (sounds.length - 1))]}
          />
        </>
      )}
      {/* <footer>Lorem ipsum dolor sit amet</footer> */}
    </div>
  );
};

export default HomePage;
