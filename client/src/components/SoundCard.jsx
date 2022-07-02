import { Link } from 'react-router-dom';
import './SoundCard.scss';

const SoundCard = ({ sound }) => {
  console.log(sound);

  return (
    <div className="sound-card">
      <div>
        <h2>{sound.title}</h2>
        <small>{new Date(sound.createdAt).toLocaleDateString('de-DE')}</small>
        <small>{sound.owner && sound.owner.name}</small>
      </div>
      <audio controls>
        <source
          src={sound.soundFile}
          // type="mp3"
        />
      </audio>
      <Link to={`/sound/${sound._id}`}>Details</Link>
    </div>
  );
};

export default SoundCard;
