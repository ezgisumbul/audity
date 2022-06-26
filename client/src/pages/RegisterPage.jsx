import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { registerUser } from '../services/authentication';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');
  const [sound, setSound] = useState('');

  const navigate = useNavigate();

  const { setUser } = useContext(AuthenticationContext);

  const handleRegistration = (event) => {
    event.preventDefault();
    registerUser({ name, email, password, picture, sound }).then((data) => {
      setUser(data.user);
      navigate('/');
    });
  };

  return (
    <div>
      <form onSubmit={handleRegistration} encType="multipart/form-data">
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="input-picture">Profile picture</label>
        <input
          id="input-picture"
          type="file"
          accept="image/*"
          value={picture}
          onChange={(event) => setPicture(event.target.value)}
        />

        <label htmlFor="input-sound">Profile audio</label>
        <input
          id="input-sound"
          type="file"
          accept="audio/*"
          value={sound}
          onChange={(event) => setSound(event.target.value)}
        />

        <button>Register New Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
