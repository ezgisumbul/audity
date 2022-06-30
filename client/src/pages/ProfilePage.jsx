import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { profileLoad } from '../services/profile';
import { Link } from 'react-router-dom';
import SoundCardList from './../components/SoundCardList';
import './ProfilePage.scss';

const ProfilePage = () => {
  const { id } = useParams();

  // Uploaded image, user name etc. wasn't displayed due to setUser being set
  // to data and not data.profile. Also profile state wasn't needed as user can be
  // accessed throughout the app with context

  const [profile, setProfile] = useState(null);
  const [sounds, setSounds] = useState([]);

  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    profileLoad(id).then((data) => {
      setProfile(data.profile)
      setSounds(data.sounds)
      console.log(data.sounds)
    })
  }, [id, setUser]);

  return (
    <div>
      {profile && (
        <>
        <header className="profile-header">
          <img
            src={
              profile.picture ||
              'https://images.unsplash.com/photo-1617994355731-5724cb5af3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
            }
            alt={profile.name}
          />
          <h1>{profile.name}</h1>
          <p>{profile.description}</p>
          <audio controls>
            <source
              src={profile.audio}
              // type="mp3"
            />
          </audio>
          {user && profile._id === user._id && (
                  <Link to={"/profile/edit"}>
                    Edit Profile
                  </Link>
          )}
        </header>
        <SoundCardList sounds={sounds} />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
