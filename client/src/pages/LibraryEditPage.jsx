import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LibraryForm from '../components/LibraryForm';
import { libraryEdit, loadLibrary } from '../services/library';

import './LibraryCreateEditPages.scss';

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
    <div className="library-form-wrapper">
      {library && (
        <LibraryForm
          isCreate={false}
          library={library}
          setLibrary={setLibrary}
          onSubmit={handleFormSubmission}
        />
      )}
    </div>
  );
};

export default LibraryEditPage;
