import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadLibrary, removeFromLibrary } from '../services/library';
import AuthenticationContext from '../context/authentication';

const LibrarySoundList = ({ library }) => {
  // These states are pointing to the same object but
  // preventing the page to be recursively rendered or not being
  // re-rendered at all combined with 2 useEffects below:
  const [libraryUpdated, setLibraryUpdated] = useState(library);
  const [libraryClone, setLibraryClone] = useState(library);

  useEffect(() => {
    loadLibrary(library._id).then((data) => {
      setLibraryUpdated(data.library);
    });
  }, [library._id, library, libraryClone]);

  useEffect(() => {}, [libraryClone]);

  const handleSoundRemovalFromLibrary = (soundToRemove) => {
    removeFromLibrary(library._id, soundToRemove)
      .then((result) => {
        setLibraryClone(result);
      })
      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    libraryUpdated && (
      <div>
        {user && (
          <>
            {libraryUpdated.user === user._id && (
              <Link to={`/library/${libraryUpdated._id}/edit`} className="btn">
                Edit library
              </Link>
            )}
          </>
        )}

        {libraryUpdated.sound &&
          libraryUpdated.sound.map(
            (sound, index) =>
              sound && (
                <div key={sound || index}>
                  <h4>{sound.title}</h4>
                  {/* <h4>{sound.owner && sound.owner.name}</h4> */}
                  <audio controls>
                    <source
                      src={sound.soundFile}
                      // type="mp3"
                    />
                  </audio>
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
                      <Link to={`/sound/${sound}`} className="btn">
                        Go to details
                      </Link>
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
