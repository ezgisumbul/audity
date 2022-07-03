import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { listLibraries } from '../services/library';
import AuthenticationContext from '../context/authentication';
import LibraryList from '../components/LibraryList';

const LibraryListPage = () => {
  const [libraries, setLibraries] = useState([]);
  const { userId } = useParams();

  //   const [selectedLibraryName, setSelectedLibraryName] = useState('');

  useEffect(() => {
    listLibraries(userId).then((data) => {
      setLibraries(data.libraries);
    });
  }, [userId]);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {(!user && <Link to={'/register'}>Register to create a library</Link>) ||
        (userId === user._id && (
          <Link to={'/library/create'}>Create new library</Link>
        ))}

      <div>
        {user && (
          <>
            {libraries &&
              libraries.map((library) => {
                return (
                  <LibraryList
                    library={library}
                    key={library._id}
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

export default LibraryListPage; 
