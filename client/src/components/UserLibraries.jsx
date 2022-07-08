import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import LibraryList from '../components/LibraryList';

const UserLibraries = ({
  libraries,
  setLibraries,
  profile,
  setProfile,
  userId
}) => {
  const { user } = useContext(AuthenticationContext);

  return (
    <div className="libraries">
      {profile && (
        <div className="library-header">
          <img
            src={
              profile.picture ||
              'https://images.unsplash.com/photo-1570499911518-9b95b0660755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2346&q=80'
            }
            alt={profile.name}
          />

          <h4>{profile.name}'s Libraries</h4>
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
            <div className="library-single-border">
              <p></p>
            </div>
            {libraries &&
              libraries.map((library) => {
                return (
                  // <div className="library-single">

                  <LibraryList
                    key={library._id}
                    library={library}
                    libraries={libraries}
                    setLibraries={setLibraries}
                    userId={userId}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default UserLibraries;
