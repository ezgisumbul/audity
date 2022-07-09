import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "./../context/authentication";
import { profileLoad } from "./../services/profile";
import { followerLoad } from "./../services/follow";
import "./ProfileCard.scss";

const ProfileCard = ({ handleUnfollowUser, unfollowBtn, profile }) => {
  const [sounds, setSounds] = useState([]);
  const [following, setFollowing] = useState(false);

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    profileLoad(profile._id).then((data) => setSounds(data.sounds));
    followerLoad(profile._id).then((data) => {
      const followers = data.follower.map((doc) => doc._id);
      if (user) {
        // checks if user is loged-in
        if (followers.includes(user._id)) setFollowing(true);
      } // checks if loged-in user follows this profile
    });
  }, [profile]);

  const handleUnfollowButton = (id) => {
    handleUnfollowUser(profile._id);
  };

  return (
    <div className="profile-card-wrapper-div">
      {profile && (
        <>
          <Link className="profile-card-link" to={`/profile/${profile._id}`}>
            <div>
              <img
                src={
                  profile.picture ||
                  "https://images.unsplash.com/photo-1570499911518-9b95b0660755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2346&q=80"
                }
                alt={profile.name}
              />
            </div>
            <div id="profile-main-info-div">
              <h4>{profile.name}</h4>
              {sounds.length !== 0 && (
                <>
                  <small>{`${sounds.length} sounds`}</small>
                </>
              )}
            </div>
          </Link>
          <div id="profile-follow-div">
            {/* the following has to be outside Link-Tag so that the Unfollow-Button dioes not take you to deleted profile */}
            {(unfollowBtn && (
              <button onClick={handleUnfollowButton}>Unfollow</button>
            )) || <>{following && <span>Following</span>}</>}
            {/* unfollowBtn is only set to true when card is rendered on FollowingPage AND when when it is the loged-in user's Following page */}
            {/* in all other cases: check if user is following profile - if yes: show following-tag */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
