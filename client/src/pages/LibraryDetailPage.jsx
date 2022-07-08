import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  libraryDelete,
  loadLibrary,
  removeFromLibrary
} from '../services/library';
import AuthenticationContext from '../context/authentication';
import SoundCard from '../components/SoundCard';

import './LibraryDetailPage.scss';

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

  const handleLibraryDeletion = (libraryId) => {
    libraryDelete(libraryId)
      .then(() => {
        navigate(`/library/${user._id}/my-libraries`);
      })
      // (result) => console.log('deletion result', result)

      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    libraryUpdated && (
      <div className="library-detail-page">
        {/* <div className="library-detail-title"> */}
        <h1>{libraryUpdated.title}</h1>
        {/* </div> */}

        <div className="library-extended-view">
          {(!libraryUpdated.sound.length && (
            <div className="sound-library-empty-state">
              <h4>Add sounds to your library</h4>
              <Link to={'/sound/search'} className="btn">
                <p>Search</p>
              </Link>
            </div>
          )) ||
            libraryUpdated.sound.map(
              (sound, index) =>
                sound && (
                  <div key={sound._id || index}>
                    {/* <h4>{sound.title}</h4>
                  <audio></audio>
                  <audio controls>
                    <source src={sound.soundFile} />
                  </audio> */}
                    <div>
                      <SoundCard
                        sound={sound}
                        onRemove={handleSoundRemovalFromLibrary}
                        library={libraryUpdated}
                      />

                      {/* {user && (
                        <div>
                          {libraryUpdated.user === user._id && (
                            <button
                              className="btn remove"
                              onClick={() => {
                                handleSoundRemovalFromLibrary(sound._id);
                              }}
                            >
                              <p>Remove</p>
                            </button>
                          )}

                        </div>
                      )} */}
                    </div>
                  </div>
                )
            )}

          {user && (
            <>
              {libraryUpdated.user === user._id && (
                <div className="edit-delete-buttons">
                  <Link to={`/library/${id}/edit`} className="btn-dark">
                    Rename library
                  </Link>
                  <button
                    onClick={() => {
                      handleLibraryDeletion(libraryUpdated._id);
                    }}
                    className="btn-light"
                  >
                    Delete library
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default LibraryDetailPage;
