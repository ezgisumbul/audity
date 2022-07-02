import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileLoad } from "./../services/profile";
import { followerLoad } from "./../services/follow";
import "./ProfileCard.scss";

const ProfileCard = ({ profile }) => {
  const [sounds, setSounds] = useState([]);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    profileLoad(profile._id).then((data) => setSounds(data.sounds));
    followerLoad(profile._id).then((data) => {
      const followers = data.follower.map((doc) => doc._id);
      if (followers.length !== 0) setFollowing(true);
    });
  }, [profile]);

  return (
    <div>
      {profile && sounds.ength !== 0 && (
        <Link className="profile-card" to={`/profile/${profile._id}`}>
          <img
            src="https://images.unsplash.com/photo-1604863047626-b716dd8980d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
            alt={profile.name}
          />
          <p>{profile.name}</p>
          <p>
            <span>{sounds.length}</span>sounds
          </p>
          {following && <p>You Follow this User</p>}
        </Link>
      )}
    </div>
  );
};

export default ProfileCard;
