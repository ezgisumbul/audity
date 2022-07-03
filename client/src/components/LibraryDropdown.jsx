import { addBookmark } from './../services/sound';
import { useContext, useState, useEffect } from 'react';
import AuthenticationContext from '../context/authentication';
import { useParams, Link } from 'react-router-dom';

// import formateDate from '../utils/format-date';
// import { addBookmark } from '../services/item';
import { listMyLibraries } from '../services/library';

import React from 'react';

const LibraryDropdown = () => {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibraryName, setSelectedLibraryName] = useState('');

  const { id } = useParams();

  const handleAddBookmark = (event) => {
    event.preventDefault();

    addBookmark(id, selectedLibraryName);
  };

  useEffect(() => {
    // setIsLoading(true);
    listMyLibraries().then((data) => {
      // console.log(data);
      setLibraries(data.libraries);
      //   setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleAddBookmark}>
        <label htmlFor="input-sound-library">Add to a library:</label>

        <select
          id="input-sound-library"
          onChange={(event) => {
            setSelectedLibraryName(event.target.value);
          }}
          value={selectedLibraryName}
        >
          <option selected="selected" disabled>
            Select library...
          </option>
          <option>Create playlist</option>
          {
            //   (isLoading && <option>... Loading</option>) ||
            libraries.map((library) => (
              <option key={library._id}>{library.title}</option>
            ))
          }
        </select>
        <button>+</button>
      </form>
    </div>
  );
};

export default LibraryDropdown;
