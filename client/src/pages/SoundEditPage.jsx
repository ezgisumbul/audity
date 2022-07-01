import { useContext, useState, useEffect } from 'react';
import { soundEdit, soundLoad } from './../services/sound';
import SoundForm from './../components/SoundForm';
import { useNavigate, useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';

const SoundEditPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthenticationContext);

  const [sound, setSound] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    soundLoad(id).then((data) => {
      if (user && data.sound.owner._id === user._id) {
        setIsOwner(true);
        setSound(data.sound);
      }
    });
  }, [id, user]);

  const handleSoundEdit = () => {
    soundEdit(id, sound).then((data) => {
      console.log(data.sound);
      navigate(`/sound/${id}`);
    });
  };

  return (
    <div>
      <h1>Add a new sound to your Archive</h1>
      {(sound && isOwner && (
        <SoundForm
          sound={sound}
          onSoundChange={setSound}
          onSoundSubmit={handleSoundEdit}
          buttonLabel="Edit Sound"
        />
      )) || <div>You can't edit this sound.</div>}
    </div>
  );
};

export default SoundEditPage;
