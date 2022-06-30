import { Link } from "react-router-dom";
import formateDate from "../utils/format-date";
import "./SoundCard.scss";

const SoundCard = ({ sound }) => {
  console.log(sound);

  return (
    <div className="sound-card">
      <div>{sound.title}</div>
      <span>{formateDate(sound.recordedAt)}</span>
      <span>{sound.owner && sound.owner.name}</span>
      <Link to={`/sound/${sound._id}`}>Details</Link>
      <audio controls>
        <source
          src={sound.soundFile}
          // type="mp3"
        />
      </audio>
    </div>
  );
};

export default SoundCard;
