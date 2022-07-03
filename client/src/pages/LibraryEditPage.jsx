import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LibraryForm from '../components/LibraryForm';
import { libraryEdit, loadLibrary } from '../services/library';

const LibraryEditPage = () => {
  const { id } = useParams();

  const [library, setLibrary] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (library.title) {
      libraryEdit(id, library).then(() => {
        navigate(`/library/${id}`);
      });
    } else {
      alert('Library title cannot be empty');
    }
  };

  useEffect(() => {
    loadLibrary(id).then((data) => setLibrary(data.library));
  }, [id]);

  return (
    <div>
      <h1>Edit library name</h1>
      {library && (
        <LibraryForm
          library={library}
          setLibrary={setLibrary}
          onSubmit={handleFormSubmission}
        />
      )}
    </div>
  );
};

export default LibraryEditPage;
