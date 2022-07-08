import SoundCard from './SoundCard';
import SoundCardHomePage from './SoundCardHomePage';
const SoundCardList = ({ sounds }) => {
  return (
    <div>
      {sounds.map((sound) => (
        <SoundCard sound={sound} key={sound._id} />
      ))}
    </div>
  );
};

export default SoundCardList;
