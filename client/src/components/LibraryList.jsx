import { useContext, useState } from 'react';
import AuthenticationContext from '../context/authentication';
import SingleLibraryExtended from './SingleLibraryExtended';

import { BsChevronDown } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';
import './LibraryList.scss';
import { Link } from 'react-router-dom';

const LibraryList = ({ library, libraries, setLibraries }) => {
  const [isExtended, setIsExtended] = useState(false);
  const handleLibraryExtend = () => {
    setIsExtended(!isExtended);
  };

  const { user } = useContext(AuthenticationContext);

  return (
    <div className="library-list-component">
      {user && (
        <div className="library-single-wrapper">
          {library && (
            <div className="library-single">
              <div className="library-single-header">
                <Link to={`/library/${library._id}`}>
                  <h4>{library.title}</h4>
                </Link>
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
                <SingleLibraryExtended
                  library={library}
                  libraries={libraries}
                  setLibraries={setLibraries}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LibraryList;
