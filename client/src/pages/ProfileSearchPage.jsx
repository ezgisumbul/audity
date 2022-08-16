import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { profileSearch } from '../services/profile';
import './ProfileSearchPage.scss';

const ProfileSearchPage = () => {
  const [term, setTerm] = useState('');

  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if statement to prevent search in case nothing is typed in
    if (term.length !== 0) {
      profileSearch(term).then((data) => {
        setProfiles(data.profiles);
        setIsLoading(false);
        // console.log("Profiles", data.profiles);
        // console.log("Profiles", data.profiles);
      });
    } else {
      setProfiles([]);
      setIsLoading(false);
      // console.log("Profiles", profiles);
    }
  }, [term]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <div className="profile-search-page">
      <form className="profile-search-form" onSubmit={handleSearch}>
        <div className="search-input-container">
          <label htmlFor="input-search-term">Search by Name</label>
          <input
            id="input-search-term"
            type="text"
            placeholder="Search for User's Profiles ..."
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
        </div>
      </form>

      <div className="search-results">
        <div>
          {term.length !== 0 && (
            <>
              {(!isLoading && profiles.length !== 0 && (
                <>
                  {profiles.map((profile) => (
                    <ProfileCard key={profile._id} profile={profile} />
                  ))}
                </>
              )) || (
                <>
                  <p>No users found.</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSearchPage;
