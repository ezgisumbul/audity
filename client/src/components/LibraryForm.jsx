import './SoundForm.scss';

const LibraryForm = ({ isCreate, library, setLibrary, onSubmit }) => {
  return (
    <div className="library-form">
      {(isCreate && <h1>Create new library</h1>) || <h1>Edit library name</h1>}
      <form onSubmit={onSubmit}>
        {(isCreate && <label htmlFor="input-title">Title</label>) || (
          <label htmlFor="input-title">New title</label>
        )}
        <input
          type="text"
          placeholder="Enter sound library name"
          id="input-title"
          value={library.title}
          onChange={(event) =>
            // console.log('HeLLO' + library.title)

            setLibrary({ ...library, title: event.target.value })
          }
        />
        {(isCreate && <button>Create</button>) || <button>Submit</button>}
      </form>
    </div>
  );
};

export default LibraryForm;
