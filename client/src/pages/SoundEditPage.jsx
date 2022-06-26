import { useState, useEffect } from 'react'
import { soundEdit, soundLoad } from './../services/sound'
import  SoundForm from './../components/SoundForm'
import { useNavigate, useParams } from 'react-router-dom';

const SoundEditPage = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const [ sound, setSound ] = useState(null)

    useEffect(() => {
      soundLoad(id).then((data) => setSound(data.sound)); 
    }, [id]);

    const handleSoundEdit = () => {
      soundEdit(id, sound).then((data) => {
        console.log(data.sound)
        navigate(`/sound/${id}`);
      });
    };

  return (
    <div>
        <h1>Add a new sound to your Archive</h1>
        {sound && 
        <SoundForm 
        sound={sound}
        onSoundChange={setSound}
        onSoundSubmit={handleSoundEdit}
        buttonLabel="Edit Sound"/>}
    </div>
  )
}

export default SoundEditPage