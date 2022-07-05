import { soundLoad, addBookmark } from './../services/sound';
import { useContext, useState, useEffect } from 'react';
import AuthenticationContext from '../context/authentication';
import { useParams, Link } from 'react-router-dom';
import formatPrice from '../utils/format-price';
// import formateDate from '../utils/format-date';
// import { addBookmark } from '../services/item';
import { listMyLibraries } from '../services/library';

import React from 'react';
import SoundMap from './../components/SoundMap';
import LibraryDropdown from '../components/LibraryDropdown';
import './SoundDetailPage.scss';
import CustomPlayer from '../components/CustomPlayer';

// import AudioPlayer from '../components/AudioPlayer';

// import AudioPlayer from '../components/AudioPlayer';
// import MyPlayer from './../components/MyPlayer';

const SoundDetailPage = () => {
  // @Johanna I couldn't understand why you are pushing sounds into an array
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState(null);

  const [successDivShow, setSuccessDivShow] = useState(false);

  // I had a div with class "succesdiv" and a 2nd class "hide" (conditionally only in case successDivShow is false);
  // when form was rendered and addBookmark was successfull I set this state to true
  // and with setInterval was setting it to false again after 2 seconds - the styling of these

  // const [libraries, setLibraries] = useState([]);
  // const [selectedLibraryName, setSelectedLibraryName] = useState('');

  const { id } = useParams();

  //const [sounds, setSounds] = useState();

  useEffect(() => {
    setIsLoading(true);
    soundLoad(id)
      .then((response) => {
        const arr = [];
        arr.push(response.sound);
        setSound(arr);
        setIsLoading(false);

        /*       console.log(response.sound.position.coordinates); */
      })
      .catch(() => setIsError(true));
  }, [id]);

  // const handleAddBookmark = (event) => {
  //   event.preventDefault();

  //   addBookmark(id, selectedLibraryName);
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   listMyLibraries().then((data) => {
  //     // console.log(data);
  //     setLibraries(data.libraries);
  //     setIsLoading(false);
  //   });
  // }, []);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {sound && (
        <>
          <h1>{sound[0].title}</h1>
          <span>
            {sound[0].recordedAt &&
              new Date(sound[0].recordedAt).toLocaleDateString('de-DE')}
          </span>
          <h2>
            A sound by{' '}
            <Link to={`/profile/${sound[0].owner._id}`}>
              {sound[0].owner.name}
            </Link>
          </h2>
          <p>{sound[0].description}</p>
          <ul>
            {sound[0].tags.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {(isLoading && <div>Loading...</div>) ||
            (isError && <div>Error!</div>) || <SoundMap sounds={sound} />}
          <audio controls>
            <source
              src={sound[0].soundFile}
              // type="mp3"
            />
          </audio>
          {/* <CustomPlayer source={sound[0]} /> */}
          {/* <Player source={sound[0]} /> */}

          {/* <AudioPlayer /> */}
          {/* <audio-player /> */}
          <small>
            {sound[0].price === 0
              ? 'you can use it for free'
              : 'price: ' + formatPrice(sound[0].price)}
          </small>

          {/* <button>add to sound library</button> */}
          {sound[0].owner._id === user._id && (
            <Link to={`/sound/${id}/edit`}>Edit Sound</Link>
          )}
          <br></br>

          <LibraryDropdown />

          {/* <form onSubmit={handleAddBookmark}>
            <label htmlFor="input-sound-library">
              Choose a library to add:
            </label> */}

          {/* <ul>
              {libraries.map((library) => (
                <li key={library._id}>{library.title}</li>
              ))}
            </ul> */}

          {/* <select
              id="input-sound-library"
              // onChange={handleLibraryToAdd}
              // onFocus={(this.selectedIndex = -1)}
              onChange={(event) => {
                // console.log(event.target.value);
                setSelectedLibraryName(event.target.value);
              }}
              value={selectedLibraryName}
            >
              <option>Add to library</option>
              {(isLoading && <option>... Loading</option>) ||
                libraries.map((library) => (
                  <option key={library._id}>{library.title}</option>
                ))}
            </select> */}
          {/* <button>+</button>
          </form> */}
        </>
      )}
      <div className={`successdiv ${successDivShow ? '' : 'hide'}`}>
        <h3>Sound was added to library</h3>
      </div>
    </div>
  );
};

export default SoundDetailPage;
