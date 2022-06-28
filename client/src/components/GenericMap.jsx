import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const GenericMap = ({ children, ...props }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  return (
    (isLoaded && (
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '400px' }}
        center={{ lat: 52.520008, lng: 13.404954 }}
        zoom={10}
        options={{ fullscreenControl: false, streetViewControl: false }}
        {...props}
      >
        {children}
      </GoogleMap>
    )) || <></>
  );
};

export default GenericMap;
