import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { listMyLibraries } from '../services/library';
import AuthenticationContext from '../context/authentication';
import LibraryList from '../components/LibraryList';
import { profileLoad } from '../services/profile';

import './UserLibrariesPage.scss';

const MyLibrariesPage = () => {
  const [libraries, setLibraries] = useState([]);
  const [profile, setProfile] = useState(null);

  //   const [selectedLibraryName, setSelectedLibraryName] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    profileLoad(userId).then((data) => {
      // console.log(data);
      setProfile(data.profile);
    });
    listMyLibraries(userId).then((data) => {
      setLibraries(data.libraries);
    });
  }, []);

  const { user } = useContext(AuthenticationContext);

  return (
    <div className="library-list-page">
      {(!libraries.length && (
        <div className="library-empty-state-wrapper">
          <div className="library-empty-state">
            <h1>Start creating sound libraries now</h1>
            <Link to={'/library/create'} className="btn">
              Create library
            </Link>
          </div>
        </div>
      )) || (
        <div className="libraries">
          {profile && (
            <div>
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

              {(!user && (
                <div className="create-btn">
                  <Link to={'/register'}>
                    <p>Register to create a Library</p>
                  </Link>
                </div>
              )) || (
                <div className="create-btn">
                  <Link to={'/library/create'}>
                    <p>Create new Library +</p>
                  </Link>
                </div>
              )}

              <div className="library-list">
                {user && (
                  <>
                    <div className="library-single-border">
                      <p></p>
                    </div>
                    {libraries &&
                      libraries.map((library) => {
                        return (
                          <LibraryList
                            library={library}
                            key={library._id}
                            libraries={libraries}
                            setLibraries={setLibraries}
                          />
                        );
                      })}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyLibrariesPage;
