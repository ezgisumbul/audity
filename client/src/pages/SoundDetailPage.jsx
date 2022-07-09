import { soundLoad, addBookmark } from './../services/sound';
import { useContext, useState, useEffect } from 'react';
import AuthenticationContext from '../context/authentication';
import { useParams, Link } from 'react-router-dom';
import formatPrice from '../utils/format-price';
import { listMyLibraries } from '../services/library';

import React from 'react';
import SoundMap from './../components/SoundMap';
import LibraryDropdown from '../components/LibraryDropdown';
import './SoundDetailPage.scss';

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

  useEffect(() => {
    setIsLoading(true);
    soundLoad(id)
      .then((response) => {
        const arr = [];
        arr.push(response.sound);
        setSound(arr);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [id]);

  const { user } = useContext(AuthenticationContext);

  return (
    <div className="sound-detail-page">
      {sound && (
        <>
          <div className="sound-top-div">
            {/* <hr /> */}
            <div className="basic-infos">
              <h3>{sound[0].title} </h3>
              <div>
                <small>
                  {sound[0].recordedAt &&
                    new Date(sound[0].recordedAt).toLocaleDateString('de-DE')}
                </small>
                <small>
                  recorded by{' '}
                  <Link to={`/profile/${sound[0].owner._id}`}>
                    {sound[0].owner.name}
                  </Link>
                </small>
                <small>
                  recording quality: <i className="tag">{sound[0].quality}</i>{' '}
                </small>
              </div>

              <div className="profile-description">
                <h4>{sound[0].description}</h4>
              </div>

              <div className="price-wide-div">
                {(!user && (
                  <small id="sound-price-small">
                    {sound[0].price === 0
                      ? 'You can use this sound for free.'
                      : 'You can use this sound for your project for ' +
                        formatPrice(sound[0].price)}
                  </small>
                )) || (
                  <>
                    {sound[0].owner._id !== user._id && (
                      <small id="sound-price-small">
                        {sound[0].price === 0
                          ? 'You can use this sound for free.'
                          : 'You can use this sound for your project for ' +
                            formatPrice(sound[0].price)}
                      </small>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="tag-cloud">
              {sound[0].tags.map((item) => (
                <div className="tag" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="map-and-player-div-wide">
            <div className="audio-player">
              <div>
                <audio controls>
                  <source
                    src={sound[0].soundFile}
                    // type="mp3"
                  />
                </audio>
              </div>
            </div>

            <LibraryDropdown />
          </div>

          {(isLoading && <div>Loading...</div>) ||
            (isError && <div>Error!</div>) || <SoundMap sounds={sound} />}

          <div className="map-and-player-div-mobile">
            <div className="audio-player">
              <div>
                <audio controls>
                  <source
                    src={sound[0].soundFile}
                    // type="mp3"
                  />
                </audio>
              </div>
            </div>

            <div className="price-mobile-div">
              {(!user && (
                <small id="sound-price-small">
                  {sound[0].price === 0
                    ? 'You can use this sound for free.'
                    : 'You can use this sound for your project for ' +
                      formatPrice(sound[0].price)}
                </small>
              )) || (
                <>
                  {sound[0].owner._id !== user._id && (
                    <small id="sound-price-small">
                      {sound[0].price === 0
                        ? 'You can use this sound for free.'
                        : 'You can use this sound for your project for ' +
                          formatPrice(sound[0].price)}
                    </small>
                  )}
                </>
              )}
            </div>

            <hr />
            <LibraryDropdown />
          </div>

          {user && sound[0].owner._id === user._id && (
            <div className=" btn send-button edit-btn">
              <Link to={`/sound/${id}/edit`}>Edit Sound</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SoundDetailPage;
