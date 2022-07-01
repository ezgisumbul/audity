import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadLibrary, removeFromLibrary } from '../services/library';
import AuthenticationContext from '../context/authentication';

const LibraryDetailPage = () => {
  const [library, setLibrary] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadLibrary(id).then((data) => {
      setLibrary(data.library);
      console.log(library);
    });
  }, [id]);

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
        const newLibrary = res;
        setLibrary(newLibrary);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    library && (
      <div>
        <h1>{library.title}</h1>

        {user && (
          <>
            {library.user === user._id && (
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

        {library.sound &&
          library.sound.map(
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
                      {library.user === user._id && (
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
