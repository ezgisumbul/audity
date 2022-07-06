import { useState, useEffect } from 'react';
import { tags } from './../utils/tags';
import TagsCheckboxComponent from './../components/TagsCheckboxComponent';
import { soundSearch } from './../services/sound';
import SoundMapAndListToggle from '../components/SoundMapAndListToggle';
import './SoundSearchPage.scss';
const qualities = ['high', 'medium', 'low'];

const SoundSearchPage = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(tags.length).fill(false)
  );

  const [checkedQualitiesState, setCheckedQualitiesState] = useState(
    new Array(qualities.length).fill(false)
  );

  const [query, setQuery] = useState({
    term: '',
    tags: [],
    quality: []
  });

  const [sounds, setSounds] = useState([]);

  const [mapView, setMapView] = useState(true);

  useEffect(() => {
    soundSearch(query).then((response) => {
      setSounds(response.data);
    });
  }, [query]);

  const handleTagListChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    let soundArray = query.tags;

    if (!query.tags.includes(tags[position])) {
      soundArray.push(tags[position]);
    } else {
      soundArray = query.tags.filter((item) => item !== tags[position]);
    }
    setQuery({ ...query, tags: soundArray });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const onhandleQualitiesChange = (position) => {
    const updatedCheckedQualitiesState = checkedQualitiesState.map(
      (item, index) => (index === position ? !item : item)
    );

    setCheckedQualitiesState(updatedCheckedQualitiesState);

    let qualityArray = query.quality;

    if (!query.quality.includes(qualities[position])) {
      qualityArray.push(qualities[position]);
    } else {
      qualityArray = query.quality.filter(
        (item) => item !== qualities[position]
      );
    }

    setQuery({ ...query, quality: qualityArray });
  };

  const handleTermInputChange = (event) => {
    setQuery({ ...query, term: event.target.value });
    console.log(event.target.value);
  };

  return (
    <div className="sound-search-page">
      <h1>Search for Sounds</h1>
      <div className="sound-search-results">
        <div className="input-search-term">
          <label htmlFor="input-search-term"></label>
          <input
            id="input-search-term"
            type="text"
            placeholder="Search for Sounds ..."
            value={query.term}
            onChange={handleTermInputChange}
          />
        </div>
      </div>
      <h1>Filter by Tags</h1>

      <form onSubmit={(event) => handleFormSubmit(event)}>
        <TagsCheckboxComponent
          checkedStateArray={checkedState}
          onhandleTagListChange={handleTagListChange}
        />

        <h1>Choose Quality</h1>

        <div className="quality-list quality-wrapper">
          {qualities.map((name, index) => {
            return (
              <div key={index}>
                <div className="qualities-list-item" id="quality-button">
                  <div className="single-quality-button">
                    <label htmlFor={`custom-quality-checkbox-${index}`}>
                      <input
                        type="checkbox"
                        hidden
                        id={`custom-quality-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={checkedQualitiesState[index]}
                        onChange={() => onhandleQualitiesChange(index)}
                      />
                      <span>{name}</span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </form>

      <div>
        <ul>
          {sounds.length !== 0 && (
            <>
              <SoundMapAndListToggle
                mapView={mapView}
                setMapView={setMapView}
                sounds={sounds}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SoundSearchPage;
