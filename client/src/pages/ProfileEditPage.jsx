import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../components/AuthenticationForm';
import AuthenticationContext from '../context/authentication';
import { profileEdit, profileLoad } from '../services/profile';

const ProfileEditPage = () => {
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user) {
      profileLoad(user._id).then((data) => setProfile(data.profile));
    }
  }, [user]);

  const handleProfileEdit = (event) => {
    profileEdit(profile).then((data) => {
      setUser(data.profile);
      navigate(`/profile/${user._id}`);
    });
  };

  return (
    <div>
      <h1>Profile Edit</h1>
      {profile && (
        <AuthenticationForm
          user={profile}
          buttonLabel="Update Account"
          displayInputs={['name', 'email', 'description', 'picture', 'sound']}
          onUserChange={setProfile}
          onAuthenticationSubmit={handleProfileEdit}
        />
      )}
    </div>
  );
};

export default ProfileEditPage;
