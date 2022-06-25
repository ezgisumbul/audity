import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LogInPage from './pages/LogInPage';
import ProfileEdit from './pages/ProfileEdit';

import Navbar from './components/Navbar';
import AuthenticationContext from './context/authentication';
import { loadUserInformation } from './services/authentication';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserInformation().then((data) => {
      setUser(data.user);
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/log-in" element={<LogInPage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
};

export default App;
