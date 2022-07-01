import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listLibraries } from '../services/library';
import AuthenticationContext from '../context/authentication';
import LibraryList from '../components/LibraryList';

const LibraryListPage = () => {
  const [libraries, setLibraries] = useState([]);

  //   const [selectedLibraryName, setSelectedLibraryName] = useState('');

  useEffect(() => {
    listLibraries().then((data) => {
      setLibraries(data.libraries);
    });
  }, []);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {(!user && (
        <Link to={'/library/create'}>Register to create a library</Link>
      )) || <Link to={'/library/create'}>Create new library</Link>}

      <div>
        {user && (
          <>
            {libraries &&
              libraries.map((library) => {
                return <LibraryList library={library} key={library._id} />;
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default LibraryListPage;
