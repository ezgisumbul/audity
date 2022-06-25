import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { profileLoad } from '../services/profile';

const ProfilePage = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    profileLoad(id).then((data) => {
      console.log(data.profile);
      setProfile(data);

      /* setSounds(data.sounds); */
    });
  }, [id]);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {profile && (
        <header>
          <img
            src={
              profile.picture ||
              'https://images.unsplash.com/photo-1617994355731-5724cb5af3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
            }
            alt={profile.name}
          />
          <h1>{profile.name}</h1>
        </header>
      )}
    </div>
  );
};

export default ProfilePage;
