import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthenticationContext from "../context/authentication";
import { profileLoad } from "../services/profile";
import {
  followUser,
  unFollowUser,
  followerLoad,
  followedLoad,
} from "../services/follow";
import SoundMapAndListToggle from "../components/SoundMapAndListToggle";

import "./ProfilePage.scss";
import { listLibraries } from "../services/library";

const ProfilePage = () => {
  const { id } = useParams();

  // Uploaded image, user name etc. wasn't displayed due to setUser being set
  // to data and not data.profile. Also profile state wasn't needed as user can be
  // accessed throughout the app with context

  const [profile, setProfile] = useState(null);
  const [sounds, setSounds] = useState([]);

  const [followed, setFollowed] = useState([]); //users that this user follows
  const [follower, setFollower] = useState([]); //users that are following this user
  const [followerIds, setFollowerIds] = useState([]);

  const [mapView, setMapView] = useState(true);

  const [libraries, setLibraries] = useState(null);

  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    profileLoad(id).then((data) => {
      setProfile(data.profile);
      setSounds(data.sounds);
    });
    followedLoad(id).then((data) => setFollowed(data.followed));
    followerLoad(id)
      .then((data) => {
        setFollower(data.follower);
        const followerIdArray = data.follower.map((document) => document._id);
        setFollowerIds(followerIdArray);
      })
      .then(() => {
        listLibraries(id)
          .then((data) => {
            setLibraries(data.libraries);
          })
          .catch((err) => console.log(err));
      });
  }, [id, setUser]);

  const handleFollow = () => {
    followUser(profile._id)
      .then(() => followerLoad(id))
      .then((data) => {
        setFollower(data.follower);
        const followerIdArray = data.follower.map((document) => document._id);
        setFollowerIds(followerIdArray);
      });
  };

  const handleUnFollow = () => {
    unFollowUser(profile._id)
      .then(() => followerLoad(id))
      .then((data) => {
        setFollower(data.follower);
        const followerIdArray = data.follower.map((document) => document._id);
        setFollowerIds(followerIdArray);
        console.log(data.follower);
      });
  };

  return (
    <div>
      {profile && (
        <>
          <div className="profile-header">
            <h1>Hi, I'm {profile.name}</h1>
            <img
              src={
                profile.picture ||
                "https://images.unsplash.com/photo-1570499911518-9b95b0660755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2346&q=80"
              }
              alt={profile.name}
            />

            <div>
              <Link to={`/profile/${id}/following`}>
                {followed.length !== 0 && `Following ${followed.length}`}
              </Link>
              <br />
              <Link to={`/profile/${id}/follower`}>
                {follower.length !== 0 && `Followers ${follower.length}`}
              </Link>
            </div>

            {user && profile._id === user._id && (
              <Link to={"/profile/edit"}>Edit Profile</Link>
            )}

            {user && profile._id !== user._id && (
              <>
                <Link to={`/message/${id}`}>Send Message</Link>
                {!followerIds.includes(user._id) ? (
                  <button onClick={handleFollow}>Follow</button>
                ) : (
                  <button onClick={handleUnFollow}>Unfollow</button>
                )}
              </>
            )}

            <p>{profile.description}</p>

            {profile.sound && (
              <audio controls>
                <source
                  src={profile.sound}
                  // type="mp3"
                />
              </audio>
            )}
          </div>

          {(sounds.length !== 0 && (
            <SoundMapAndListToggle
              mapView={mapView}
              setMapView={setMapView}
              sounds={sounds}
            />
          )) ||
            (user._id === profile._id && (
              <Link to={"/sound-create"}>Create your first sound</Link>
            ))}

          <div>
            <Link to={`/library/${id}/list`}>
              See {profile.name}'s sound library
            </Link>
          </div>

          <div>
            {libraries &&
              libraries.map((library) => {
                return (
                  <Link key={library._id} to={`/library/${library._id}`}>
                    {library.title}
                  </Link>
                );
              })}
          </div>

          {/* {user && profile._id === user._id && (
            <Link to={"/library/list"}>See {profile.name}'s sound library</Link>
          )} */}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
