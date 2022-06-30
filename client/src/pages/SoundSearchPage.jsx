import { useState, useEffect } from 'react';
import { tags } from './../utils/tags';
import TagsCheckboxComponent from './../components/TagsCheckboxComponent';
import { soundSearch } from './../services/sound'
import SoundCardList from './../components/SoundCardList';
import SoundMap from './../components/SoundMap';

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
    console.log(qualityArray);
    setQuery({ ...query, quality: qualityArray });
  };

  const handleTermInputChange = (event) => {
    setQuery({...query, term: event.target.value})
    console.log(event.target.value)
  }

  return (
    <div>

      <h1>Search for Sounds</h1>
      <label htmlFor="input-search-term">Search by Name</label>
        <input
          id="input-search-term"
          type="text"
          placeholder="Search for User's Profiles ..."
          value={query.term}
          onChange={handleTermInputChange}
        />

      <h1>Filter by Tags</h1>
      <form onSubmit={(event) => handleFormSubmit(event)}>
        <TagsCheckboxComponent
          checkedStateArray={checkedState}
          onhandleTagListChange={handleTagListChange}
        />

        <h1>Choose Quality</h1>
        <ul className="quality-list">
          {qualities.map((name, index) => {
            return (
              <li key={index}>
                <div className="qualities-list-item">
                  <input
                    type="checkbox"
                    id={`custom-quality-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedQualitiesState[index]}
                    onChange={() => onhandleQualitiesChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </li>
            );
          })}
        </ul>
      </form>

      <div>
        <ul>
        {sounds && 
          (<>
          <SoundCardList sounds={sounds} />
          <SoundMap sounds={sounds} />
          </>)
        }
        </ul>
      </div>
    </div>
  );
};

export default SoundSearchPage;
