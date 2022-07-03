import SoundCardList from "./SoundCardList";
import SoundMap from "./SoundMap";

const SoundMapAndListToggle = ({ sounds, setMapView, mapView }) => {
  return (
    <>
      {sounds.length !== 0 && (
        <div>
          <button
            className={mapView ? "" : "selected"}
            onClick={() => {
              setMapView(false);
            }}
          >
            List
          </button>
          <button
            className={mapView ? "selected" : ""}
            onClick={() => setMapView(true)}
          >
            Map
          </button>

          <div className={mapView ? "hide" : ""}>
            <SoundCardList sounds={sounds} />
          </div>
          <div className={mapView ? "" : "hide"}>
            <SoundMap sounds={sounds} />
          </div>
        </div>
      )}
    </>
  );
};

export default SoundMapAndListToggle;
