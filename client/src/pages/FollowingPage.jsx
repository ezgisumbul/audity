import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "./../context/authentication";
import { useParams } from "react-router-dom";
import { unFollowUser, followedLoad } from "./../services/follow";
import { profileLoad } from "./../services/profile";
import ProfileCard from "../components/ProfileCard";
import "./FollowingPage.scss";

const FollowingPage = () => {
  const { id } = useParams();
  const [followed, setFollowed] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    followedLoad(id).then((data) => {
      setFollowed(data.followed);
    });
    profileLoad(id).then((data) => {
      setProfile(data.profile);
    });
  }, [id]);

  const { user } = useContext(AuthenticationContext);

  const handleUnfollowUser = (UserId) => {
    unFollowUser(UserId)
      .then(() => {
        return followedLoad(id);
      })
      .then((data) => {
        setFollowed(data.followed);
      });
  };

  return (
    <div className="follower-div">
      {(followed.length !== 0 && profile && (
        <div className="search-results-div">
          <h2>{`${profile.name} Following`}</h2>
          <ul>
            {followed.map((followed) => (
              <li key={followed._id}>
                <ProfileCard
                  unfollowBtn={user._id === id ? true : false}
                  handleUnfollowUser={handleUnfollowUser}
                  profile={followed}
                />
              </li>
            ))}
          </ul>
        </div>
      )) || (
        <div className="search-results-div">
          {profile && (
            <p>
              <span>{profile.name}</span> is not following anyone yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowingPage;
