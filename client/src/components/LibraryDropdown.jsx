import { addBookmark } from './../services/sound';
import { useContext, useState, useEffect } from 'react';
import AuthenticationContext from '../context/authentication';
import { useParams, Link } from 'react-router-dom';

// import formateDate from '../utils/format-date';
// import { addBookmark } from '../services/item';
import { listAvailableLibraries } from '../services/sound';
import './LibraryDropdown.scss';

import { toast } from 'react-toastify';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const LibraryDropdown = () => {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibraryName, setSelectedLibraryName] = useState('');

  const { id } = useParams();

  const handleAddBookmark = (event) => {
    event.preventDefault();
    addBookmark(id, selectedLibraryName);
    toast.success('Sound added to the library! 💁‍♀️', {
      position: toast.POSITION.BOTTOM_CENTER,

      bodyClassName: 'grow-font-size'
    });
  };

  useEffect(() => {
    // setIsLoading(true);
    listAvailableLibraries(id).then((data) => {
      // console.log(data);
      setLibraries(data.libraries);
      //   setIsLoading(false);
    });
  }, []);

  return (
    <div className="library-dropdown-div">
      <ToastContainer
        bodyClassName="grow-font-size"
        autoClose={2000}
        transition={Flip}
      />
      <form onSubmit={handleAddBookmark}>
        <label htmlFor="input-sound-library">
          <h2>Add to a library</h2>
        </label>
        <div className="library-dropdown">
          <select
            id="input-sound-library"
            onChange={(event) => {
              setSelectedLibraryName(event.target.value);
            }}
            value={selectedLibraryName}
          >
            {/* <option selected="selected" disabled>
            Select library...
          </option> */}
            <optgroup label="Select library...">
              <option>Create library</option>
              {
                //   (isLoading && <option>... Loading</option>) ||
                libraries.map((library) => (
                  <option key={library._id}>{library.title}</option>
                ))
              }
            </optgroup>
          </select>
          <div className="create-button">
            <button>Add</button>
          </div>
          {/* <div className="add-button">
            <button>+</button>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default LibraryDropdown;
