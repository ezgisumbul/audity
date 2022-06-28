import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const SoundMap = ({ sounds }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const navigate = useNavigate();

  return (
    (isLoaded && (
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '400px' }}
        center={{ lat: 52.520008, lng: 13.404954 }}
        zoom={10}
        options={{ fullscreenControl: false, streetViewControl: false }}
      >
        {sounds.map((sound) => (
          <Marker
            key={sound._id}
            position={{ lat: 52.520008, lng: 13.404954 }}
            onClick={() => navigate(`/sound/${sound._id}`)}
          />
        ))}
      </GoogleMap>
    )) || <></>
  );
};

export default SoundMap;
