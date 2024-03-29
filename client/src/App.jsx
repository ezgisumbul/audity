import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import ProfileSearchPage from './pages/ProfileSearchPage';
import ProfileEditPage from './pages/ProfileEditPage';
import SoundCreatePage from './pages/SoundCreatePage';
import SoundEditPage from './pages/SoundEditPage';
import SoundDetailPage from './pages/SoundDetailPage';
import SoundSearchPage from './pages/SoundSearchPage';
import FollowerPage from './pages/FollowerPage';
import FollowingPage from './pages/FollowingPage';

import Navbar from './components/Navbar';
import AuthenticationContext from './context/authentication';
import { loadUserInformation } from './services/authentication';

import LibraryCreatePage from './pages/LibraryCreatePage';
import LibraryDetailPage from './pages/LibraryDetailPage';
import UserLibrariesPage from './pages/UserLibrariesPage';
import MessageThreadPage from './pages/MessageThreadPage';
import MessageDetailPage from './pages/MessageDetailPage';
import LibraryEditPage from './pages/LibraryEditPage';
import MyLibrariesPage from './pages/MyLibrariesPage';

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
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/search" element={<ProfileSearchPage />} />
          <Route path="/profile/:id/follower" element={<FollowerPage />} />
          <Route path="/profile/:id/following" element={<FollowingPage />} />
          <Route path="/sound-create" element={<SoundCreatePage />} />
          <Route path="/library/create" element={<LibraryCreatePage />} />
          <Route path="/library/:id/edit" element={<LibraryEditPage />} />
          <Route path="/library/:id" element={<LibraryDetailPage />} />
          <Route path="/library/:userId/list" element={<UserLibrariesPage />} />
          <Route
            path="/library/:userId/my-libraries"
            element={<MyLibrariesPage />}
          />
          <Route path="/sound/:id/edit" element={<SoundEditPage />} />
          <Route path="/sound/:id" element={<SoundDetailPage />} />
          <Route path="/sound/search" element={<SoundSearchPage />} />
          <Route path="/message/list" element={<MessageThreadPage />} />
          <Route path="/message/:id" element={<MessageDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
};

export default App;
