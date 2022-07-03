import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericMap from "./GenericMap";

const SoundMap = ({ sounds, onMove }) => {
  const navigate = useNavigate();

  const [markerPosition, setMarkerPosition] = useState({
    lat: 52.520008,
    lng: 13.404954,
  });

  const handleOnDisplay = () => {
    sounds.map((sound) =>
      setMarkerPosition({
        ...markerPosition,
        lat: sound.position.coordinates[0],
        lng: sound.position.coordinates[1],
      })
    );
  };

  return (
    <div>
      {/* <img src="/Map-Marker-PNG-Pic.png" alt="" /> */}
      <GenericMap onMove={onMove} markerPosition={markerPosition}>
        {sounds &&
          sounds.map((sound) => (
            <Marker
              icon={"/Map-Marker-PNG-Pic.png"}
              onLoad={handleOnDisplay}
              key={sound._id}
              position={{
                lat: sound.position.coordinates[0],
                lng: sound.position.coordinates[1],
              }}
              onClick={() => navigate(`/sound/${sound._id}`)}
            />
          ))}
      </GenericMap>
    </div>
  );
};

export default SoundMap;
