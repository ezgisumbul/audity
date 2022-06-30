import SoundCard from './SoundCard'

const SoundCardList = ({sounds}) => {
  return (
    <div>
      {sounds.map((sound) => 
      <SoundCard sound={sound} key={sound._id}/>
      )}
  
    </div>
  )
}

export default SoundCardList