import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadLibrary, removeFromLibrary } from '../services/library';
import AuthenticationContext from '../context/authentication';

const LibrarySoundList = ({ library }) => {
  //   const [library, setLibrary] = useState(null);

  //   const { id } = useParams();

  useEffect(() => {
    loadLibrary(library._id).then((data) => {
      console.log('LOAD LIBRARY:');
      console.log(data);
      //   setLibrary(data.library);
      // console.log(data.library);
    });
  }, [library._id, library]);

  // useEffect(() => {
  //   console.log('this is the second useEffect');
  // }, [library]);

  //   }, [id, library]); -> if I add library as a dependency then, the page
  // re-renders when I remove an item. But it makes continuous get requests
  // to the library/:id. How can I re-render but not make many requests?

  const handleSoundRemovalFromLibrary = (soundToRemove) => {
    console.log('SOUND TO REMOVE:');
    console.log(soundToRemove);
    removeFromLibrary(library._id, soundToRemove)
      .then((res) => {
        // const newLibrary = res;
        // setLibrary(newLibrary);
        console.log('SUPPOSEDLY REMOVED');
        console.log('res:');
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    library && (
      <div>
        {/* <h1>{library.title}</h1> */}
        {/* <h2>{library.user}</h2>
        <h4>{user._id}</h4> */}
        {user && (
          <>
            {library.user === user._id && (
              <Link to={`/library/${library._id}/edit`} className="btn">
                Edit library
              </Link>
            )}
          </>
        )}

        {/* {
          //   console.log('library')}
          console.log(library.sound)
        } */}

        {library.sound &&
          library.sound.map(
            (sound, index) =>
              sound && (
                <div key={sound || index}>
                  {console.log('SOUND TITLE')}
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
                      {library.user === user._id && (
                        <div>
                          <button
                            onClick={() => {
                              handleSoundRemovalFromLibrary(sound);
                              console.log('This is sound id');
                              console.log(sound);
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
