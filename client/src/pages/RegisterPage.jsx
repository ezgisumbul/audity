import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../components/AuthenticationForm';
import AuthenticationContext from '../context/authentication';
import { registerUser } from '../services/authentication';
import './RegisterPage.scss';
const RegisterPage = () => {
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

  const handleRegistration = (event) => {
    // console.log(user);
    registerUser(user).then((data) => {
      console.log('successfull registration');
      setUser(data.user);
      navigate('/');
    });
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-page">
        <h1>Register New Account</h1>
        <AuthenticationForm
          user={user}
          buttonLabel="Register New Account"
          displayInputs={[
            'name',
            'email',
            'password',
            'description',
            'picture',
            'sound'
          ]}
          onUserChange={setUserState}
          onAuthenticationSubmit={handleRegistration}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
