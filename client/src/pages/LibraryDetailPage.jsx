import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadLibrary, removeFromLibrary } from '../services/library';

const LibraryDetailPage = () => {
  const [library, setLibrary] = useState(null);
  //   const [soundToRemove, setSoundToRemove] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadLibrary(id).then((data) => {
      setLibrary(data.library);
    });
  }, [id]);
  //   }, [id], library); -> if I add library as a dependency then, the page
  // re-renders when I remove an item. But it makes continuous get requests
  // to the library/:id. How can I re-render but not make many requests?

  const handleSoundRemovalFromLibrary = (soundToRemove) => {
    console.log(soundToRemove);
    removeFromLibrary(id, soundToRemove);
  };

  return (
    library && (
      <div>
        <h1>{library.title}</h1>
        {library.item.map((item) => (
          <div key={item._id}>
            <h4>{item.name}</h4>
            <h4>{item.owner.name}</h4>
            <h4>{item.owner.email}</h4>
            <button
              onClick={() => {
                handleSoundRemovalFromLibrary(item._id);
              }}
            >
              Remove from the library
            </button>
          </div>
        ))}
      </div>
    )
  );
};

export default LibraryDetailPage;

// useEffect(() => {
//   loadItems(id).then((data) => {
//     setItem(data.item);
//   });
// }, [id]);

// const handleAddBookmark = (event) => {
//   event.preventDefault();
//   addBookmark(id, selectedLibraryName);
//   console.log('HEYYO' + selectedLibraryName);
//   //   .then((result) => console.log(result)) // here I can have a state bookmark and setBookmark to true
//   //   .catch((err) => console.log(err));
// };

// useEffect(() => {
//   listLibraries().then((data) => {
//     //   console.log(data);
//     setLibraries(data.libraries);
//   });
// }, []);
