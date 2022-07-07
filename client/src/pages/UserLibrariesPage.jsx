import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { listLibraries } from '../services/library';
import AuthenticationContext from '../context/authentication';
import LibraryList from '../components/LibraryList';
import { profileLoad } from '../services/profile';

import './UserLibrariesPage.scss';
import UserLibraries from '../components/UserLibraries';

const LibraryListPage = () => {
  const [libraries, setLibraries] = useState([]);
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();

  //   const [selectedLibraryName, setSelectedLibraryName] = useState('');

  useEffect(() => {
    profileLoad(userId).then((data) => {
      // console.log(data);
      setProfile(data.profile);
    });
    listLibraries(userId).then((data) => {
      // console.log(data.libraries);
      setLibraries(data.libraries);
    });
  }, [userId]);

  const { user } = useContext(AuthenticationContext);

  return (
    <div className="library-list-page">
      <UserLibraries
        mobile={true}
        libraries={libraries}
        setLibraries={setLibraries}
        profile={profile}
        setProfile={setProfile}
        userId={userId}
      />
    </div>
  );
};

export default LibraryListPage;
