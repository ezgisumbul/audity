import { soundLoad } from './../services/sound';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import formatPrice from '../utils/format-price';

import React from 'react';
import SoundMap from './../components/SoundMap';

const SoundDetailPage = () => {
  const [sound, setSound] = useState(null);

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

  return (
    <div>
      {sound && (
        <>
          <h1>{sound[0].title}</h1>
          <span>{sound[0].createdAt}</span> {/* todo: format date */}
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
        </>
      )}
      <br></br>
      {sound && (
        <>
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
        </>
      )}
      <br></br>
      Link to similar Sounds?
      <br></br>
      <button>add to sound library</button>
      <Link to={`./edit`}>Edit</Link>
    </div>
  );
};

export default SoundDetailPage;
