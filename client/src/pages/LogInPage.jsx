import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import AuthenticationForm from '../components/AuthenticationForm';
import { logInUser } from '../services/authentication';

const LogInPage = () => {
  const navigate = useNavigate();

  const [user, setUserState] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    picture: '',
    sound: ''
  });

  const { setUser } = useContext(AuthenticationContext);

  const handleLogIn = () => {
    logInUser(user).then((data) => {
      setUser(data.user);
      navigate('/');
    });
  };

  return (
    <div>
      <h1>Log In to Existing Account</h1>
      <AuthenticationForm
        user={user}
        buttonLabel="Log in"
        displayInputs={['email', 'password']}
        onUserChange={setUserState}
        onAuthenticationSubmit={handleLogIn}
      />
    </div>
  );
};

export default LogInPage;
