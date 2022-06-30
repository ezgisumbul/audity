import { useState } from 'react';
import { libraryCreate } from '../services/library';

const LibraryCreate = () => {
  const [library, setLibrary] = useState({
    title: 'bbb',
    user: '',
    item: ''
  });

  const handleFormSubmission = () => {
    libraryCreate(library).then((data) => {
      setLibrary(data);
      console.log(data);
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-title">Title</label>
        <input
          id="input-title"
          value={library.title}
          onChange={(event) =>
            // console.log('HeLLO' + library.title)

            setLibrary({ ...library, title: event.target.value })
          }
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LibraryCreate;
