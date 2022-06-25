import {useState } from 'react'

const SoundCreatePage = () => {

    const [ sound, setSound ] = useState(null)

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('create sound')
    }

  return (
    <div>
        <h1>Add a new sound to your Archive</h1>
        <form onSubmit={(event) => handleFormSubmit(event)}>
            <label htmlFor="titleInput">Title</label>
            <input id="titleInput" onChange={(event)=> setSound(...sound, {title: event.target.value})} value="" />

            <label htmlFor="descriptionInput">Description</label>
            <input id="descriptionInput" onChange={(event)=> setSound(...sound, {description: event.target.value})} value="" />

            <label htmlFor="uploadInput">Upload Sound File</label>
            <input id="uploadInput" onChange={(event)=> setSound(...sound, {soundFile: event.target.value})} value="" />
            
            <label htmlFor="tagsInput">Add Tags</label>
            <input id="tagsInput" onChange={(event)=> setSound(...sound, {tags: event.target.value})} value="" />

            <label htmlFor="qualityInput">Quality of the Recording</label>
            <input id="qualityInput" onChange={(event)=> setSound(...sound, {quality: event.target.value})} value="" />

            <label htmlFor="positionInput">Location of Recording</label>
            <input id="positionInput" onChange={(event)=> setSound(...sound, {position: event.target.value})} value="" />

            <label htmlFor="priceInput">Price</label>
            <input id="priceInput" onChange={(event)=> setSound(...sound, {price: event.target.value})} value="" />

            <label>Private?</label>
            <input onChange={(event)=> setSound(...sound, {bublished: event.target.value})} value="" />

            <button>Create new sound</button>
        </form>
    </div>
  )
}

export default SoundCreatePage