import { Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import GenericMap from './GenericMap';

const SoundMap = ({ sounds, onMove }) => {
  const navigate = useNavigate();
  console.log(sounds);

  return (
    <GenericMap onMove={onMove}>
      {sounds.map((sound) => (
        <Marker
          key={sound._id}
          position={{
            lat: sound.position.coordinates[0],
            lng: sound.position.coordinates[1]
          }}
          onClick={() => navigate(`/sound/${sound._id}`)}
        />
      ))}
    </GenericMap>
  );
};

export default SoundMap;
