import { soundLoad, addBookmark } from './../services/sound';
import { useContext, useState, useEffect } from 'react';
import AuthenticationContext from '../context/authentication';
import { useParams, Link } from 'react-router-dom';
import formatPrice from '../utils/format-price';
import formateDate from '../utils/format-date';
// import { addBookmark } from '../services/item';
import { listLibraries } from '../services/library';

import React from 'react';
import SoundMap from './../components/SoundMap';

const SoundDetailPage = () => {
  // @Johanna I couldn't understand why you are pushing sounds into an array

  const [sound, setSound] = useState(null);

  const [libraries, setLibraries] = useState([]);
  const [selectedLibraryName, setSelectedLibraryName] = useState('');

  const { id } = useParams();

  //const [sounds, setSounds] = useState();

  useEffect(() => {
    soundLoad(id).then((response) => {
      const arr = [];
      arr.push(response.sound);
      setSound(arr);

      /*       console.log(response.sound.position.coordinates); */
    });
  }, [id]);

  const handleAddBookmark = (event) => {
    event.preventDefault();

    addBookmark(id, selectedLibraryName);
    console.log('HEYYO' + selectedLibraryName);
  };

  useEffect(() => {
    listLibraries().then((data) => {
      //   console.log(data);
      setLibraries(data.libraries);
    });
  }, []);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {sound && (
        <>
          <h1>{sound[0].title}</h1>
          <span>{formateDate(sound[0].recordedAt)}</span>{' '}
          {/* todo: format date */}
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
          <SoundMap sounds={sound} />
          <audio controls>
            <source
              src={sound[0].soundFile}
              // type="mp3"
            />
          </audio>
          <small>
            {sound[0].price === 0
              ? 'you can use it for free'
              : 'price: ' + formatPrice(sound[0].price)}
          </small>
          <br></br>
          Link to similar Sounds?
          <br></br>
          {/* <button>add to sound library</button> */}
          {sound[0].owner._id === user._id && (
            <Link to={`/sound/${id}/edit`}>Edit Sound</Link>
          )}
          <br></br>
          {/* Sound will be carried to library create */}
          <Link to={'/library/create'}>Save to new library</Link>
          <form onSubmit={handleAddBookmark}>
            <label htmlFor="input-sound-library">
              Choose a library to add:
            </label>

            {/* <ul>
              {libraries.map((library) => (
                <li key={library._id}>{library.title}</li>
              ))}
            </ul> */}

            <select
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
              {libraries.map((library) => (
                <option key={library._id}>{library.title}</option>
              ))}
            </select>
            <button>+</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SoundDetailPage;
