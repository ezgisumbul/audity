import { Link } from 'react-router-dom';
import LibraryDropdown from './LibraryDropdown';
import './SoundCard.scss';

const SoundCard = ({ sound }) => {
  return (
    <div className="sound-home-card">
      {sound && (
        <div className="soundcard-home-wrapper">
          <div className="soundcard-home-left">
            <div className="soundcard-home-title">
              <small>{sound.title} </small>
            </div>

            <audio controls controlsList="nodownload noplaybackrate">
              <source src={sound.soundFile} />
            </audio>
          </div>

          <Link className="soundcard-detail-btn" to={`/sound/${sound._id}`}>
            <p>Show Details</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SoundCard;
