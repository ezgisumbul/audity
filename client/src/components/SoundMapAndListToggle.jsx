import SoundCardList from "./SoundCardList";
import SoundMap from "./SoundMap";
import "./SoundMapAndListToggle.scss";

const SoundMapAndListToggle = ({ sounds, setMapView, mapView }) => {
  return (
    <div className="soundmaplisttoggle-div">
      {sounds.length !== 0 && (
        <>
          <div className="toggle-btn-div">
            <button
              className={mapView ? "unselected" : ""}
              onClick={() => {
                setMapView(false);
              }}
            >
              List
            </button>
            <button
              className={mapView ? "" : "unselected"}
              onClick={() => setMapView(true)}
            >
              Map
            </button>
          </div>

          <div className={mapView ? "hide" : ""}>
            <SoundCardList sounds={sounds} />
          </div>
          <div className={mapView ? "" : "hide"}>
            <SoundMap sounds={sounds} />
          </div>
        </>
      )}
    </div>
  );
};

export default SoundMapAndListToggle;
