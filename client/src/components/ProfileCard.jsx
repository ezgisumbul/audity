import { Link } from 'react-router-dom';
import './ProfileCard.scss';

const ProfileCard = ({ profile }) => (
  <Link className="profile-card" to={`/profile/${profile._id}`}>
    <img
      src="https://images.unsplash.com/photo-1604863047626-b716dd8980d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
      alt={profile.name}
    />
    <span>{profile.name}</span>
  </Link>
);

export default ProfileCard;
