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
    <div className="profile-page-div">
      {profile && (
        <>
          <div className="profile-header">
            <h1>Hi, I'm {profile.name}</h1>
            <div className="profile-header-top">
              <div className="profile-img-div">
                <img
                  src={
                    profile.picture ||
                    "https://images.unsplash.com/photo-1570499911518-9b95b0660755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2346&q=80"
                  }
                  alt={profile.name}
                />

                <div id="follower">
                  <small>
                    <Link to={`/profile/${id}/following`}>
                      {followed.length !== 0 && `Following ${followed.length}`}
                    </Link>
                  </small>
                  <br />
                  <small>
                    <Link to={`/profile/${id}/follower`}>
                      {follower.length !== 0 && `Followers ${follower.length}`}
                    </Link>
                  </small>
                </div>
                <div className="edit-profile-div">
                  {user && profile._id === user._id && (
                    <div>
                      <Link className="btn edit-btn" to={"/profile/edit"}>
                        Edit Profile
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="profile-aside">
                <div className="audio-description-div">
                  <p className="profile-description-mobile">
                    {profile.description}
                  </p>

                  {profile.sound && (
                    <audio controls>
                      <source
                        src={profile.sound}
                        // type="mp3"
                      />
                    </audio>
                  )}
                </div>

                {user && profile._id !== user._id && (
                  <div id="profile-message-follow-div">
                    <div>
                      <Link className="btn" to={`/message/${id}`}>
                        Send Message
                      </Link>
                    </div>
                    {!followerIds.includes(user._id) ? (
                      <button onClick={handleFollow}>Follow</button>
                    ) : (
                      <button className="red-btn" onClick={handleUnFollow}>
                        Unfollow
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {profile && (
        <>
          {(sounds.length !== 0 && (
            <div id="profile-sounds-div">
              <h3>Sounds</h3>
              <SoundMapAndListToggle
                mapView={mapView}
                setMapView={setMapView}
                sounds={sounds}
              />
            </div>
          )) ||
            (user._id === profile._id && (
              <Link to={"/sound-create"}>Create your first sound</Link>
            ))}

          <div id="profile-libraries">
            {libraries && (
              <>
                <h4>
                  <Link to={`/library/${id}/list`}>Sound Lists</Link>
                </h4>
                {libraries.map((library) => {
                  return (
                    <>
                      <div>
                        <>
                          <Link
                            key={library._id}
                            to={`/library/${library._id}`}
                          >
                            {library.title}
                          </Link>
                          <small>{`${library.sound.length} sounds`}</small>
                        </>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
      {/* {user && profile._id === user._id && (
            <Link to={"/library/list"}>See {profile.name}'s sound library</Link>
          )} */}
    </div>
  );
};

export default ProfilePage;
