import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { profileSearch } from "../services/profile";
import "./ProfileSearchPage.scss";

const ProfileSearchPage = () => {
  const [term, setTerm] = useState("");

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // if statement to prevent search if nothing is typed in
    if (term.length !== 0) {
      profileSearch(term).then((data) => {
        setProfiles(data.profiles);
      });
    } else {
      setProfiles([]);
    }
  }, [term]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form className="profile-search-form" onSubmit={handleSearch}>
        <label htmlFor="input-search-term">Search by Name</label>
        <input
          id="input-search-term"
          type="text"
          placeholder="Search for User's Profiles ..."
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
        <button>Search</button>
      </form>
      {profiles.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileSearchPage;
