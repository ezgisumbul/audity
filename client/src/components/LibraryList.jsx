import { useContext, useState } from 'react';
import AuthenticationContext from '../context/authentication';
import LibrarySoundList from '../components/LibrarySoundList';

import { BsChevronDown } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';
import './LibraryList.scss';

const LibraryList = ({ library, libraries, setLibraries }) => {
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
            <div className="library-single">
              <div className="library-single-header">
                <h4>{library.title}</h4>

                <button
                  className="library-chevron"
                  onClick={handleLibraryExtend}
                >
                  {(isExtended && (
                    <p>
                      <BsChevronDown />
                    </p>
                  )) || (
                    <p>
                      <BsChevronRight />
                    </p>
                  )}
                </button>
              </div>
              {isExtended && (
                <LibrarySoundList
                  library={library}
                  libraries={libraries}
                  setLibraries={setLibraries}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LibraryList;
