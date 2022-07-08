import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followerLoad } from "./../services/follow";
import { profileLoad } from "./../services/profile";
import ProfileCard from "../components/ProfileCard";
import "./FollowingPage.scss";

const FollowerPage = () => {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    followerLoad(id).then((data) => {
      setFollowers(data.follower);
    });
    profileLoad(id).then((data) => {
      setProfile(data.profile);
    });
  }, [id]);

  return (
    <div className="follower-div">
      {(followers.length !== 0 && profile && (
        <div className="search-results-div">
          <h2>{`${profile.name}'s Followers`}</h2>
          <ul>
            {followers.map((follower) => (
              <li key={follower._id}>
                <ProfileCard profile={follower} />
              </li>
            ))}
          </ul>
        </div>
      )) || (
        <div className="search-results-div">
          {profile && (
            <p>
              <span>{profile.name}</span> has no followers yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowerPage;
