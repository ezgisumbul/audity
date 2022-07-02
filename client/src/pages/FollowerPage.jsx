import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followerLoad } from "./../services/follow";
import { profileLoad } from "./../services/profile";
import ProfileCard from "../components/ProfileCard";

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
    <div>
      {(followers.length !== 0 && profile && (
        <>
          <p>
            <span>{profile.name}</span>'s followers:
          </p>
          <ul>
            {followers.map((follower) => (
              <li key={follower._id}>
                <ProfileCard profile={follower} />
              </li>
            ))}
          </ul>
        </>
      )) || (
        <div>
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
