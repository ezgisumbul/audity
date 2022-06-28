import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const PetMapList = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAWDaGNyr9WRznseNxVSYIHlCbzfsqQcS4'
    /* process.env.REACT_APP_GOOGLE_MAPS_API_KEY */
  });

  const center = {
    lat: 52.52230591164587,
    lng: 13.44065956640625
  };

  return (
    (isLoaded && (
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '400px' }}
        center={center}
        zoom={10}
        options={{ fullscreenControl: false, streetViewControl: false }}
      >
        {props.pets.map((pet) => (
          <Marker
            key={pet._id}
            position={pet.position}
            onClick={() => props.onMarkerOpen(pet._id)}
          />
        ))}
      </GoogleMap>
    )) || <></>
  );
};

export default PetMapList;
