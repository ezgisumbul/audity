import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import customMapStyle from "./../utils/custom-map-style";

const GenericMap = ({ children, onLoad, onMove, markerPosition, ...props }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    (isLoaded && (
      <div>
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "400px" }}
          center={
            (markerPosition && {
              lat: markerPosition.lat,
              lng: markerPosition.lng,
            }) || {
              lat: 52.520008,
              lng: 13.404954,
            }
          }
          zoom={10}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            backgroundColor: "green",
            zoomControl: false,
            mapTypeControl: false,
            styles: customMapStyle,
          }}
          {...props}
        >
          {children}
        </GoogleMap>
        {/* <div>onLoad();</div> */}
      </div>
    )) || <></>
  );
};

export default GenericMap;
