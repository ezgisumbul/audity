import { useContext, useState } from 'react';
import AuthenticationContext from '../context/authentication';
import LibrarySoundList from '../components/LibrarySoundList';

const LibraryList = ({ library }) => {
  const [isExtended, setIsExtended] = useState(false);
  const handleLibraryExtend = () => {
    setIsExtended(!isExtended);
  };

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {user && (
        <>
          {library && (
            <>
              <h1>{library.title}</h1>

              <button onClick={handleLibraryExtend}>⌄</button>
              {isExtended && <LibrarySoundList library={library} />}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LibraryList;
