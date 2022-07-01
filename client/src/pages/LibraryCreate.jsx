import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { libraryCreate } from '../services/library';

const LibraryCreate = () => {
  const navigate = useNavigate();

  const [library, setLibrary] = useState({
    title: '',
    user: '',
    sound: ''
  });

  const handleFormSubmission = (event) => {
    event.preventDefault();
    libraryCreate(library).then((data) => {
      setLibrary(data);
      console.log(data);
      navigate('/library/list');
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-title">Title</label>
        <input
          placeholder="Enter sound library name"
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
