import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  libraryDelete,
  listMyLibraries,
  loadLibrary,
  removeFromLibrary
} from '../services/library';
import AuthenticationContext from '../context/authentication';
import SoundCard from './SoundCard';

const LibrarySoundList = ({ library, libraries, setLibraries }) => {
  // These states are pointing to the same object but
  // preventing the page to be recursively rendered or not being
  // re-rendered at all combined with 3 useEffects below:
  const [libraryUpdated, setLibraryUpdated] = useState(library);
  const [libraryClone, setLibraryClone] = useState(library);

  const navigate = useNavigate();

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
      .then(() => listMyLibraries())
      .then((result) => {
        setLibraries(result.libraries);

        // console.log('deletion result', result);
      })
      .then(() => {
        navigate('/library/my-libraries');
      })
      // (result) => console.log('deletion result', result)

      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    libraryUpdated && (
      <div>
        {user && (
          <>
            {libraryUpdated.user === user._id && (
              <>
                <Link
                  to={`/library/${libraryUpdated._id}/edit`}
                  className="btn"
                >
                  Edit library
                </Link>
                <button
                  onClick={() => {
                    handleLibraryDeletion(libraryUpdated._id);
                  }}
                  className="btn"
                >
                  Delete library
                </button>
              </>
            )}
          </>
        )}

        {libraryUpdated.sound &&
          libraryUpdated.sound.map(
            (sound, index) =>
              sound && (
                <div key={sound || index}>
                  <SoundCard sound={sound} />
                  {user && (
                    <>
                      {libraryUpdated.user === user._id && (
                        <div>
                          <button
                            onClick={() => {
                              handleSoundRemovalFromLibrary(sound._id);
                            }}
                          >
                            Remove from the library
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
          )}
      </div>
    )
  );
};

export default LibrarySoundList; 
