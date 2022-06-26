import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadItems, setBookmark } from '../services/item';

const ItemPage = () => {
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadItems(id).then((data) => {
      setItem(data.item);
    });
  }, [id]);

  const handleAddBookmark = () => {
    setBookmark(id)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    item && (
      <div>
        <h1>{item.name}</h1>
        <h4>{item.owner}</h4>
        <button onClick={handleAddBookmark}>Add to list</button>
      </div>
    )
  );
};

export default ItemPage;
