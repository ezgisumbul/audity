import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { profileLoad } from '../services/profile';
import { Link } from 'react-router-dom';
import './ProfilePage.scss';

const ProfilePage = () => {
  const { id } = useParams();

  // Uploaded image, user name etc. wasn't displayed due to setUser being set
  // to data and not data.profile. Also profile state wasn't needed as user can be
  // accessed throughout the app with context

  // const [profile, setProfile] = useState(null);
  // const [sounds, setSounds] = useState([]);
  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    profileLoad(id).then((data) => {
      /*       console.log(data.profile); */
      setUser(data.profile);

      /* setSounds(data.sounds); */
    });
  }, [id, setUser]);

  // const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {user && (
        <header className="profile-header">
          <img
            src={
              user.picture ||
              'https://images.unsplash.com/photo-1617994355731-5724cb5af3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
            }
            alt={user.name}
          />
          <h1>{user.name}</h1>
          <p>{user.description}</p>
          <audio controls>
            <source
              src={user.audio}
              // type="mp3"
            />
          </audio>
          <Link to="/profile/edit">Edit Profile</Link>
        </header>
      )}
    </div>
  );
};

export default ProfilePage;
