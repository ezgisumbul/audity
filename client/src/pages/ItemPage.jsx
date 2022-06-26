import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadItems, setBookmark, loadLibraries } from '../services/item';

const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [libraries, setLibraries] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadItems(id).then((data) => {
      setItem(data.item);
    });
  }, [id]);

  const handleAddBookmark = () => {
    setBookmark(id);
    //   .then((result) => console.log(result)) // here I can have a state bookmark and setBookmark to true
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLibraries().then((data) => {
      console.log(data);
      setLibraries(data.libraries);
    });
  }, [id]);

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
              <li>{library.title}</li>
            ))}
          </ul>

          <select id="input-sound-library">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            {libraries.map((library) => (
              <option key={library._id} value={library.title}>
                {library.title}
              </option>
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
