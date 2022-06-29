import { Marker } from '@react-google-maps/api';
import GenericMap from './GenericMap';

const SoundInputMap = ({ position, onPositionChange }) => {
  const handleSoundLocationSetting = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    onPositionChange({ type: 'Point', coordinates: [lat, lng] });
  };

  return (
    <GenericMap onClick={handleSoundLocationSetting}>
      {position && (
        <Marker
          position={{
            lat: position.coordinates[0],
            lng: position.coordinates[1]
          }}
        />
      )}
    </GenericMap>
  );
};

export default SoundInputMap;
