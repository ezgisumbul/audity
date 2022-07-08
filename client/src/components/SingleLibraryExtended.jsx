import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  libraryDelete,
  listMyLibraries,
  loadLibrary,
  removeFromLibrary
} from '../services/library';
import AuthenticationContext from '../context/authentication';
import SoundCard from './SoundCard';
// import { MdRemoveCircleOutline } from 'react-icons/md';

import './SingleLibraryExtended.scss';

const LibrarySoundList = ({ library, libraries, setLibraries }) => {
  // These states are pointing to the same object but
  // preventing the page to be recursively rendered or not being
  // re-rendered at all combined with 3 useEffects below:
  const [libraryUpdated, setLibraryUpdated] = useState(library);
  const [libraryClone, setLibraryClone] = useState(library);

  const navigate = useNavigate();

  const { userId } = useParams();
  useEffect(() => {
    loadLibrary(library._id).then((data) => {
      setLibraryUpdated(data.library);
    });
  }, [library._id, library, libraryClone]);

  useEffect(() => {}, [libraryClone]);
  useEffect(() => {}, [libraries]);

  const handleSoundRemovalFromLibrary = (soundToRemove) => {
    removeFromLibrary(library._id, soundToRemove)
      .then((result) => {
        setLibraryClone(result);
      })
      .catch((error) => console.log(error));
  };

  const handleLibraryDeletion = (libraryId) => {
    libraryDelete(libraryId)
      .then(() => listMyLibraries(userId))
      .then((result) => {
        setLibraries(result.libraries);

        // console.log('deletion result', result);
      })
      .then(() => {
        navigate(`/library/${userId}/my-libraries`);
      })
      // (result) => console.log('deletion result', result)

      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    libraryUpdated && (
      <div className="library-extended-view">
        {user && (
          <>
            {libraryUpdated.user === user._id && (
              <div className="edit-delete-buttons">
                <Link
                  to={`/library/${libraryUpdated._id}/edit`}
                  className="btn-small btn-dark"
                >
                  Rename library
                </Link>
                <div className="edit-delete-buttons">
                  <button
                    onClick={() => {
                      handleLibraryDeletion(libraryUpdated._id);
                    }}
                    className="btn-small btn-light"
                  >
                    Delete library
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {libraryUpdated.sound &&
          libraryUpdated.sound.map(
            (sound, index) =>
              sound && (
                <div key={sound || index}>
                  <div>
                    <SoundCard
                      sound={sound}
                      onRemove={handleSoundRemovalFromLibrary}
                      library={libraryUpdated}
                    />
                  </div>
                </div>
              )
          )}
      </div>
    )
  );
};

export default LibrarySoundList;
