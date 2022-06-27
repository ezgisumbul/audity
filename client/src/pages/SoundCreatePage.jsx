import { useState } from 'react'
import { soundCreate } from './../services/sound'
import  SoundForm from './../components/SoundForm'
import { useNavigate } from 'react-router-dom';

const SoundCreatePage = () => {

    const navigate = useNavigate()

    const [ sound, setSound ] = useState({
      title: '',
      description: '',
      tags: [],
      price: 0,
    //   position,
      published: true,
      soundFile: '',
      quality: 'medium'
    })

    const handleSoundCreation = () => {
        soundCreate(sound).then((data) => {
            const id = data.sound._id;
            navigate(`/sound/${id}`);
          });
        }
 
  return (
    <div>
        <h1>Add a new sound to your Archive</h1>
        <SoundForm 
            sound={sound}
            onSoundChange={setSound}
            onSoundSubmit={handleSoundCreation}
            buttonLabel="Add Sound"/>
    </div>
  )
}

export default SoundCreatePage