import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listMyLibraries } from '../services/library';
import AuthenticationContext from '../context/authentication';
import LibraryList from '../components/LibraryList';

const MyLibrariesPage = () => {
  const [libraries, setLibraries] = useState([]);

  //   const [selectedLibraryName, setSelectedLibraryName] = useState('');

  useEffect(() => {
    listMyLibraries().then((data) => {
      setLibraries(data.libraries);
    });
  }, []);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {(!user && (
        <Link to={'/register'}>Register to create a library</Link>
      )) || <Link to={'/library/create'}>Create new library</Link>}

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
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default MyLibrariesPage;
