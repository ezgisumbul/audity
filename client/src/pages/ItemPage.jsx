import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadItems, addBookmark, loadLibraries } from '../services/item';

const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [libraries, setLibraries] = useState([]);
  const [selectedLibraryName, setSelectedLibraryName] = useState('');

  const { id } = useParams();

  useEffect(() => {
    loadItems(id).then((data) => {
      setItem(data.item);
    });
  }, [id]);

  const handleAddBookmark = (event) => {
    event.preventDefault();
    addBookmark(id, selectedLibraryName);
    console.log('HEYYO' + selectedLibraryName);
    //   .then((result) => console.log(result)) // here I can have a state bookmark and setBookmark to true
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLibraries().then((data) => {
      //   console.log(data);
      setLibraries(data.libraries);
    });
  }, []);

  //   const handleLibraryToAdd = () => {
  //     libraries.map((library) => console.log(library.title));
  //     // setSelectedLibrary()
  //     // addToPlaylist() -> a service making post request which will pass the playlist id to backend
  //   };

  return (
    item && (
      <div>
        <h1>{item.name}</h1>
        <h4>{item.owner}</h4>
        <form onSubmit={handleAddBookmark}>
          <label htmlFor="input-sound-library">Choose a library to add:</label>

          {/* Sound will be carried to library create */}
          <Link to={'/library-create'}>Save to new library</Link>

          <ul>
            {libraries.map((library) => (
              <li key={library._id}>{library.title}</li>
            ))}
          </ul>

          <select
            id="input-sound-library"
            // onChange={handleLibraryToAdd}
            // onFocus={(this.selectedIndex = -1)}
            onChange={(event) => {
              console.log(event.target.value);
              setSelectedLibraryName(event.target.value);
            }}
            value={selectedLibraryName}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            {libraries.map((library) => (
              <option key={library._id}>{library.title}</option>
            ))}
          </select>
          <button>Add to list</button>
        </form>
        {/* <button onClick={handleAddBookmark}>Add to list</button> */}
      </div>
    )
  );
};

export default ItemPage;
