import React from 'react'

const SoundCardList = ({sounds}) => {
  return (
    <div>
          <ul>
          {sounds.map((sound) => (
            <li key={sound._id}>
              {sound.title} 
              {/* todo: has to be replaced with SoundCard Component */}
            </li>
          ))}
          </ul>
        </div>
  )
}

export default SoundCardList