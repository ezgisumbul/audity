import { useState } from 'react';
import { tags } from './../utils/tags';
import TagsCheckboxComponent from './../components/TagsCheckboxComponent';

const SoundSearchPage = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(tags.length).fill(false)
  );

  const handleTagListChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    console.log(checkedState);
  };

  return (
    <div>
      <h1>Search for Sounds</h1>
      <h1>Filter by Tags</h1>

      <TagsCheckboxComponent
        checkedStateArray={checkedState}
        onhandleTagListChange={handleTagListChange}
      />
    </div>
  );
};

export default SoundSearchPage;
