import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LibraryForm from '../components/LibraryForm';
import { libraryCreate } from '../services/library';
import AuthenticationContext from '../context/authentication';

import './LibraryCreateEditPages.scss';
const LibraryCreate = () => {
  const navigate = useNavigate();
  // const { userId } = useParams();

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

        navigate(`/library/${user._id}/my-libraries`);
      });
    } else {
      alert('Library title cannot be empty');
    }
  };
  const { user } = useContext(AuthenticationContext);

  return (
    <div className="library-form-wrapper">
      <LibraryForm
        isCreate={true}
        library={library}
        setLibrary={setLibrary}
        onSubmit={handleFormSubmission}
      />
    </div>
  );
};

export default LibraryCreate;
