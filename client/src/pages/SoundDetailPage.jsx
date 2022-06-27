import { soundLoad } from './../services/sound'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import formatPrice from '../utils/format-price';

import React from 'react'

const SoundDetailPage = () => {
    const [sound, setSound] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        soundLoad(id).then((response) => setSound(response.sound))
    }, [id])

  return (
    <div>
        {sound && 
        <>
        <h1>{sound.title}</h1><span>{sound.createdAt}</span> {/* todo: format date */}
        <h2>A sound by <Link to={`/profile/${sound.owner._id}`}>{sound.owner.name}</Link></h2>
        <p>{sound.description}</p>
        <ul>
            {sound.tags.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
        </>}
        Map Component
        <br></br>
        {sound &&
        <>
        <audio controls>
            <source
              src={sound.soundFile}
              // type="mp3"
            />
        </audio>

        <small>{sound.price===0 ? 'you can use it for free' : 'price: '+formatPrice(sound.price)}</small>
        </>}
        <br></br>
        Link to similar Sounds?
        <br></br>
        <button>add to sound library</button> 
        <Link to={`./edit`}>Edit</Link>

    </div>
  )
}

export default SoundDetailPage