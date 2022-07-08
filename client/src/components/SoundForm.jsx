import { useState } from 'react';
import SoundInputMap from './SoundInputMap';
import { tags } from './../utils/tags';
import TagsCheckboxComponent from './TagsCheckboxComponent';
import './LibraryForm.scss';

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
    <div className="sound-form">
      <form onSubmit={(event) => handleFormSubmit(event)}>
        <main>
          <div className="name-and-date">
            <div className="label-and-input name-input">
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
            </div>

            <div className="label-and-input date-input">
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
            </div>
          </div>

          <div className="label-and-input">
            <label className="custom-name-label">Description</label>
            <label
              htmlFor="descriptionInput"
              className="custom-name-label"
            ></label>
            <textarea
              rows="3"
              className="textarea"
              id="descriptionInput"
              onChange={(event) =>
                onSoundChange({ ...sound, description: event.target.value })
              }
              value={sound.description}
              placeholder="A short description"
            />
          </div>
        </main>
        <div>
          <div className="map-label sound-map">
            <label htmlFor="descriptionInput" className="custom-name-label">
              Choose loaction
            </label>
          </div>
        </div>
        <div>
          <SoundInputMap
            position={sound.position}
            onPositionChange={(position) =>
              onSoundChange({ ...sound, position })
            }
          />
        </div>
        <br sound-input-map />

        <div className="label-and-input sound-upload-input">
          <label htmlFor="input-picture" className="custom-name-label">
            Upload Audio File
          </label>
          <label htmlFor="uploadInput" className="custom-file-upload">
            <input
              id="uploadInput"
              type="file"
              // accept="audio/*"
              // accept=".wav,.aif,.aiff,.flac,.alac,.aac,.ogg,.mp3,.mp4"
              accept="audio/wav, audio/mp3"
              // , audio/aiff, audio/flac, audio/alac, aduio/aac, audio/ogg, audio/mp3, audio/*, .wav,.aif,.aiff,.flac,.alac,.aac,.ogg,.mp3"
              name="soundFile"
              //value={sound.soundFile}  // <-- when I uncomment this it throws in error: Has to do with type: file (but there is a string stored in the db still)
              onChange={handleFileInputChange}
            />
          </label>
        </div>

        <div className="label-and-input checkbox-input">
          <div className="headline">
            <label>Add Tags</label>
          </div>

          <TagsCheckboxComponent
            checkedStateArray={checkedState}
            onhandleTagListChange={handleTagListChange}
          />
        </div>
        <main className="quality-and-price">
          <div className="label-and-input quality-input">
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
          </div>
          <div className="label-and-input price-input">
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
          </div>
        </main>

        <div className="tags-list-item" id="publish-button">
          <div className="publish-button">
            <label htmlFor="publishInput" className="custom-name-label">
              <input
                type="checkbox"
                hidden
                id="publishInput"
                checked={!sound.published}
                onChange={(event) =>
                  onSoundChange({ ...sound, published: !event.target.checked })
                }
                value={sound.published}
              />
              <span>{sound.published ? 'set private' : 'set public'}</span>
            </label>
          </div>
        </div>
        <div className="create-button">
          <button>{buttonLabel}</button>
        </div>
      </form>
    </div>
  );
};

export default SoundForm;
