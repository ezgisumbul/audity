import { useState } from 'react';

const ItemCreate = () => {
  const handleFormSubmission = () => {};

  const [item, setItem] = useState();
  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          value={item}
          onChange={(event) => {
            setItem(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ItemCreate;
