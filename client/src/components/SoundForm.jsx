import { useState } from 'react';
import SoundInputMap from './SoundInputMap';
import { tags } from './../utils/tags';
import TagsCheckboxComponent from './TagsCheckboxComponent';
import './SoundForm.scss';

const SoundForm = ({ sound, onSoundChange, onSoundSubmit, buttonLabel }) => {
  const [checkedState, setCheckedState] = useState(
    //new Array(tags.length).fill(false)
    new Array(tags.length).fill(false).map((item, index) => {
      return sound.tags.includes(tags[index]) ? !item : item;
    })
  );

  const handleTagListChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    let soundArray = sound.tags;

    if (!sound.tags.includes(tags[position])) {
      soundArray.push(tags[position]);
    } else {
      soundArray = sound.tags.filter((item) => item !== tags[position]);
    }
    onSoundChange({ ...sound, tags: soundArray });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // <-- new / result os a base64 encoded audio file
    reader.onloadend = () => {
      onSoundChange({ ...sound, soundFile: reader.result });
      //console.log(reader.result)
    };

    onSoundChange({ ...sound, soundFile: event.target.value }); // <-- muss wieder gelöscht werden
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (sound.soundFile) {
      onSoundSubmit();

      setCheckedState(new Array(tags.length).fill(false));
      onSoundChange({
        title: '',
        description: '',
        tags: [],
        price: 0,
        position: null,
        published: true,
        soundFile: '',
        quality: 'medium',
        recordedAt: ''
      });
    } else {
      alert('Please select a sound file!');
    }
  };

  return (
    <div>
      <form onSubmit={(event) => handleFormSubmit(event)}>
        <label htmlFor="titleInput" className="custom-name-label">
          Title
        </label>
        <input
          type="text"
          id="titleInput"
          onChange={(event) =>
            onSoundChange({ ...sound, title: event.target.value })
          }
          value={sound.title}
          placeholder="A title for your sound"
        />

        <label htmlFor="dateInput" className="custom-name-label">
          Recorded at
        </label>
        <input
          type="date"
          id="dateInput"
          onChange={(event) =>
            onSoundChange({ ...sound, recordedAt: event.target.value })
          }
          value={sound.recordedAt}
          placeholder="A title for your sound"
        />

        <label htmlFor="descriptionInput" className="custom-name-label">
          Description
        </label>
        <textarea
          className="textarea"
          id="descriptionInput"
          onChange={(event) =>
            onSoundChange({ ...sound, description: event.target.value })
          }
          value={sound.description}
          placeholder="A short description"
        />

        <SoundInputMap
          position={sound.position}
          onPositionChange={(position) => onSoundChange({ ...sound, position })}
        />
        <br sound-input-map />
        <label htmlFor="input-picture" className="custom-name-label">
          Upload Audio File
        </label>
        <label htmlFor="uploadInput" className="custom-file-upload">
          <input
            id="uploadInput"
            type="file"
            accept="audio/*"
            name="soundFile"
            //value={sound.soundFile}  // <-- when I uncomment this it throws in error: Has to do with type: file (but there is a string stored in the db still)
            onChange={handleFileInputChange}
          />
        </label>
        <div className="headline">
          <h3>Add Tags</h3>
        </div>

        <TagsCheckboxComponent
          checkedStateArray={checkedState}
          onhandleTagListChange={handleTagListChange}
        />

        <label htmlFor="qualityInput" className="custom-name-label">
          Quality of the Recording
        </label>
        <select
          id="qualityInput"
          onChange={(event) =>
            onSoundChange({ ...sound, quality: event.target.value })
          }
          value={sound.quality}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <label htmlFor="priceInput" className="custom-name-label">
          Price
        </label>
        <input
          type="number"
          min="0"
          id="priceInput"
          onChange={(event) =>
            onSoundChange({ ...sound, price: event.target.value })
          }
          value={sound.price}
        />

        <label htmlFor="publishInput" className="custom-name-label">
          {sound.published ? 'set private' : 'set public'}

          <input
            type="checkbox"
            checked={!sound.published}
            onChange={(event) =>
              onSoundChange({ ...sound, published: !event.target.checked })
            }
            value={sound.published}
          />
        </label>

        <button>{buttonLabel}</button>
      </form>
    </div>
  );
};

export default SoundForm;
