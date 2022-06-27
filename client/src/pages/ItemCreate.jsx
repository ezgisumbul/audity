import { useEffect, useState } from 'react';
import { itemCreate } from '../services/item';

const ItemCreate = () => {
  const [item, setItem] = useState({
    name: 'aaa',
    owner: ''
  });

  const handleFormSubmission = () => {
    itemCreate(item).then((data) => setItem(data));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          value={item.name}
          onChange={(event) => setItem({ ...item, name: event.target.value })}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ItemCreate;
