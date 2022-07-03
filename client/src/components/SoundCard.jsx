import { Link } from 'react-router-dom';
import LibraryDropdown from './LibraryDropdown';
import './SoundCard.scss';

const SoundCard = ({ sound }) => {
  return (
    <div className="sound-card">
      {sound && (
        <>
          <div>
            <h2>{sound.title}</h2>
            <small>
              {sound.recordedAt &&
                new Date(sound.recordedAt).toLocaleDateString('de-DE')}
            </small>
            <small>{sound.owner && sound.owner.name}</small>
          </div>
          <audio controls>
            <source
              src={sound.soundFile}
              // type="mp3"
            />
          </audio>
          <Link to={`/sound/${sound._id}`}>Details</Link>
          <LibraryDropdown />
        </>
      )}
    </div>
  );
};

export default SoundCard;
