import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { followedLoad } from "./../services/follow";
import { profileLoad } from "./../services/profile";
import ProfileCard from "../components/ProfileCard";

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

  return (
    <div>
      {(followed.length !== 0 && profile && (
        <>
          <p>
            <span>{profile.name}</span> follows:
          </p>
          <ul>
            {followed.map((followed) => (
              <li key={followed._id}>
                <ProfileCard profile={followed} />
              </li>
            ))}
          </ul>
        </>
      )) || (
        <div>
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
