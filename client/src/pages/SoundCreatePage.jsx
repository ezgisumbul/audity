import { useState } from 'react';
import { soundCreate } from './../services/sound';
import SoundForm from './../components/SoundForm';
import { useNavigate } from 'react-router-dom';
import './SoundCreatePage.scss';

const SoundCreatePage = () => {
  const navigate = useNavigate();

  const [sound, setSound] = useState({
    title: '',
    description: '',
    tags: [],
    price: 0,
    position: null,
    published: true,
    soundFile: '',
    quality: 'medium',
    recordedAt: ''
  });

  const handleSoundCreation = () => {
    soundCreate(sound).then((data) => {
      const id = data.sound._id;
      navigate(`/sound/${id}`);
    });
  };

  return (
    <div className="sound-ceate-page">
      <h1>Add a new sound to your Archive</h1>

      <SoundForm
        sound={sound}
        onSoundChange={setSound}
        onSoundSubmit={handleSoundCreation}
        buttonLabel="Add Sound"
      />
    </div>
  );
};

export default SoundCreatePage;
