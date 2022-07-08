import { Link } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import { MdRemoveCircleOutline } from 'react-icons/md';
import './SoundCard.scss';
import { useContext } from 'react';

const SoundCard = ({ sound, onRemove, library }) => {
  const { user } = useContext(AuthenticationContext);

  return (
    <div className="sound-card">
      {sound && (
        <div className="soundcard-wrapper">
          <div className="soundcard-left">
            <div className="soundcard-title">
              <small>{sound.title} </small>
              {/* Disabled as it looked too crowded for sound card
              User's can see these info from details */}
              {/* <small>
                {sound.recordedAt &&
                  new Date(sound.recordedAt).toLocaleDateString('de-DE')}
              </small>
              <small>by {sound.owner && sound.owner.name}</small> */}

              {user && library && library.user === user._id && (
                <button
                  className="btn remove"
                  onClick={() => {
                    onRemove(sound._id);
                  }}
                >
                  Remove
                  {/* <MdRemoveCircleOutline /> */}
                </button>
              )}
            </div>

            <audio controls>
              <source
                src={sound.soundFile}
                // type="mp3"
              />
            </audio>
          </div>

          {/* <div> */}
          <Link className="soundcard-detail-btn" to={`/sound/${sound._id}`}>
            <p>Show Details</p>
          </Link>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default SoundCard;
