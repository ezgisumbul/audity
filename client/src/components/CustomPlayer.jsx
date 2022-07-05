import './CustomPlayer.scss';
import { GrBackTen } from 'react-icons/gr';
import { GrForwardTen } from 'react-icons/gr';
import { BsPlayCircle } from 'react-icons/bs';
import { BsPauseCircle } from 'react-icons/bs';
import { useState } from 'react';

const CustomPlayer = ({ source }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseToggle = () => {
    setIsPlaying(!isPlaying);
  };

  console.log(source);
  return (
    <div className="player">
      <h1>CustomPlayer</h1>
      <audio src={source.soundFile} controls></audio>
      <h2>here</h2>
      <button className="skipTen">
        <GrBackTen />
      </button>
      <button className="skipTen">
        <GrForwardTen />
      </button>
      <button className="playPause">
        <BsPlayCircle />
      </button>

      {/* current time */}
      <div className="currentTime">current time</div>
      {/* progress bar */}
      <div>
        <input type="range" className="progressBar" />
      </div>

      {/* duration */}
      <div className="duration">2:30</div>
      <h2>ends the player</h2>
    </div>
  );
};

export default CustomPlayer;
