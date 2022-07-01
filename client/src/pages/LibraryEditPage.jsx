import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { libraryEdit, loadLibrary } from '../services/library';

const LibraryEditPage = () => {
  const { id } = useParams();

  const [library, setLibrary] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmission = (event) => {
    event.preventDefault();
    libraryEdit(id, library).then(() => {
      navigate(`/library/${id}`);
    });
  };

  useEffect(() => {
    loadLibrary(id).then((data) => setLibrary(data.library));
  }, [id]);

  return (
    <div>
      <h1>Edit library name</h1>
      {library && (
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
      )}
    </div>
  );
};

export default LibraryEditPage;
