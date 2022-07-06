import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { listLibraries } from '../services/library';
import AuthenticationContext from '../context/authentication';
import LibraryList from '../components/LibraryList';
import { profileLoad } from '../services/profile';

import './LibraryListPage.scss';

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
      {profile && (
        <div className="library-header">
          <div>
            <img
              src={
                profile.picture ||
                'https://images.unsplash.com/photo-1570499911518-9b95b0660755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2346&q=80'
              }
              alt={profile.name}
            />
          </div>
          <div>
            <h4>{profile.name}'s Libraries</h4>
          </div>
        </div>
      )}

      {(!user && (
        <div className="create-btn">
          <Link to={'/register'}>
            <p>Register to create a Library</p>
          </Link>
        </div>
      )) ||
        (userId === user._id && (
          <div className="create-btn">
            <Link to={'/library/create'}>
              <p>Create new Library +</p>
            </Link>
          </div>
        ))}

      <div className="library-list">
        {user && (
          <>
            {libraries &&
              libraries.map((library) => {
                return (
                  // <div className="library-single">
                  <LibraryList
                    library={library}
                    key={library._id}
                    libraries={libraries}
                    setLibraries={setLibraries}
                    userId={userId}
                  />
                  // </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default LibraryListPage;
