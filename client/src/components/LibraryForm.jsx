const LibraryForm = ({ library, setLibrary, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="input-title">Title</label>
      <input
        placeholder="Enter sound library name"
        id="input-title"
        value={library.title}
        onChange={(event) =>
          // console.log('HeLLO' + library.title)

          setLibrary({ ...library, title: event.target.value })
        }
      />
      <button>Submit</button>
    </form>
  );
};

export default LibraryForm;
