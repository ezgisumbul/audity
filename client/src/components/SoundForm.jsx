import { useState } from 'react'
import { tags } from './../utils/tags'

const SoundForm = ({sound, onSoundChange, onSoundSubmit, buttonLabel}) => {

    const [checkedState, setCheckedState] = useState(
        new Array(tags.length).fill(false)
      );

    const  handleTagListChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
    
        let soundArray = sound.tags
        if(!sound.tags.includes(tags[position])) 
            {
                soundArray.push(tags[position])
            } else {
                soundArray = soundArray.filter(item => item !== tags[position]) //problem: item is not removed from array - dont get it
            }
        onSoundChange({...sound, tags: soundArray})

    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSoundSubmit()

        setCheckedState(new Array(tags.length).fill(false))
        onSoundChange({
            title: '',
          description: '',
          tags: [],
          price: 0,
        //   position,
          published: true,
          soundFile: '',
          quality: 'medium'
        })
    }
  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
    <label htmlFor="titleInput">Title</label>
    <input id="titleInput" onChange={(event)=> onSoundChange({...sound, title: event.target.value})} value={sound.title} placeholder="A title for your sound"/>

    <label htmlFor="descriptionInput">Description</label>
    <textarea id="descriptionInput" onChange={(event)=> onSoundChange({...sound, description: event.target.value})} value={sound.description} placeholder="A short description"/>

    <label htmlFor="uploadInput">Upload Sound File</label>
    <input id="uploadInput" onChange={(event)=> onSoundChange({...sound, soundFile: event.target.value})} value={sound.soundFile} placeholder="Select a file"/>
    
    <h3>Add Tags</h3>
    <ul className="tags-list">
        {tags.map(( name , index) => {
          return (
            <li key={index}>
              <div className="tags-list-item">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleTagListChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
              </div>
            </li>
          );
        })}
      </ul>

    <label htmlFor="qualityInput">Quality of the Recording</label>
    <select id="qualityInput" onChange={(event)=> onSoundChange({...sound, quality: event.target.value})} value={sound.quality} >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
    </select>

    <label htmlFor="positionInput">Location of Recording</label>

    <label htmlFor="priceInput">Price</label>
    <input type="number" min="0" id="priceInput" onChange={(event)=> onSoundChange({...sound, price: event.target.value})} value={sound.price}/>
    
    <label htmlFor="publishInput">{sound.published ? 'set private' : 'set public'}</label>
    <input type="checkbox" checked={!sound.published} onChange={ event => onSoundChange({...sound, published: !event.target.checked})} value={sound.published}/>

    <button>{buttonLabel}</button>
</form>
  )
}

export default SoundForm