import { Link } from 'react-router-dom';
import LibraryDropdown from './LibraryDropdown';
import './SoundCard.scss';

const SoundCard = ({ sound }) => {
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
