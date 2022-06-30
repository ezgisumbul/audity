import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { listLibraries } from '../services/library';

const LibraryListPage = () => {
  const [libraries, setLibraries] = useState([]);
  //   const [selectedLibraryName, setSelectedLibraryName] = useState('');

  useEffect(() => {
    listLibraries().then((data) => {
      setLibraries(data.libraries);
    });
  }, []);

  return (
    <div>
      <Link to={'/library/create'}>Create new library</Link>
      {libraries &&
        libraries.map((library) => (
          // I get a warning. Do I need to provide key to ul as well
          // or putting all in a div and providing a key to the
          // whole div??? key={library._id}
          <ul>
            <li key={library._id}>
              {library.title}
              {/* {library.item.map((item) => {})} */}
            </li>
          </ul>
        ))}
    </div>
  );
};

export default LibraryListPage;
