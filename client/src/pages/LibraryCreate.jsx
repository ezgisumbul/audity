import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LibraryForm from '../components/LibraryForm';
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
    if (library.title) {
      libraryCreate(library).then((data) => {
        setLibrary(data);

        navigate(`/library/my-libraries`);
      });
    } else {
      alert('Library title cannot be empty');
    }
  };

  return (
    <div>
      <LibraryForm
        library={library}
        setLibrary={setLibrary}
        onSubmit={handleFormSubmission}
      />
    </div>
  );
};

export default LibraryCreate;
