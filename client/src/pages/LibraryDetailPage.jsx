import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadLibrary, removeFromLibrary } from '../services/library';
import AuthenticationContext from '../context/authentication';

const LibraryDetailPage = () => {
  const [library, setLibrary] = useState(null);
  const [libraryUpdated, setLibraryUpdated] = useState(library);

  const { id } = useParams();

  useEffect(() => {
    loadLibrary(id).then((data) => {
      setLibraryUpdated(data.library);
      // console.log(data.library);
    });
  }, [id, library]);

  useEffect(() => {}, [library]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('this is the second useEffect');
  // }, [library]);

  //   }, [id, library]); -> if I add library as a dependency then, the page
  // re-renders when I remove an item. But it makes continuous get requests
  // to the library/:id. How can I re-render but not make many requests?

  const handleSoundRemovalFromLibrary = (soundToRemove) => {
    console.log(soundToRemove);
    removeFromLibrary(id, soundToRemove)
      .then((res) => {
        setLibrary(res);
      })
      .then(() => {
        navigate(`/library/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    libraryUpdated && (
      <div>
        <h1>{libraryUpdated.title}</h1>

        {user && (
          <>
            {libraryUpdated.user === user._id && (
              <>
                <Link to={`/library/${id}/edit`} className="btn">
                  Edit library
                </Link>
                <Link to={`/library/${id}/delete`} className="btn">
                  Delete library
                </Link>
              </>
            )}
          </>
        )}

        {libraryUpdated.sound &&
          libraryUpdated.sound.map(
            (sound, index) =>
              sound && (
                <div key={sound._id || index}>
                  <h4>{sound.title}</h4>
                  {/* <h4>{sound.owner && sound.owner.name}</h4> */}
                  <audio></audio>
                  <audio controls>
                    <source
                      src={sound.soundFile}
                      // type="mp3"
                    />
                  </audio>{' '}
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
                      <Link to={`/sound/${sound._id}`} className="btn">
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

export default LibraryDetailPage;
