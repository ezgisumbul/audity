import { Link } from 'react-router-dom';
import LibraryDropdown from './LibraryDropdown';
import './SoundCard.scss';

const SoundCard = ({ sound }) => {
  return (
    <div className="sound-card">
      {sound && (
        <>
          <div className="soundcard-wrapper">
            <div className="soundcard-leftside">
              <small>{sound.title} </small>
              <small>
                {sound.recordedAt &&
                  new Date(sound.recordedAt).toLocaleDateString('de-DE')}
              </small>
              <small>{sound.owner && sound.owner.name}</small>
            </div>
            <div>
              <audio controls>
                <source
                  src={sound.soundFile}
                  // type="mp3"
                />
              </audio>
            </div>
          </div>
          <div>
            <Link to={`/sound/${sound._id}`}>Details</Link>
          </div>
          <div>
            <LibraryDropdown />
          </div>
        </>
      )}
    </div>
  );
};

export default SoundCard;
