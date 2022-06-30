import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { libraryEdit, libraryLoad } from '../services/library';

const LibraryEditPage = () => {
  const { id } = useParams();

  const [library, setLibrary] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmission = () => {
    libraryEdit(id, library).then((data) => setLibrary(data));
  };

  useEffect(() => {
    libraryLoad(id).then((data) => setLibrary(data.library));
  }, [id]);

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-title">Title</label>
        <input
          id="input-title"
          value={library.title}
          onChange={(event) =>
            setLibrary({ ...library, title: event.target.value })
          }
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LibraryEditPage;
