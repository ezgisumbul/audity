import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { messageThreadLoad } from '../services/message';
import './ThreadPreviewCard.scss';
import ProfilePage from '../pages/ProfilePage';

const ThreadPreviewComponent = ({ profile }) => {
  const [previewInfo, setPreviewInfo] = useState({
    message: '',
    createdAt: 'some time ago'
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    messageThreadLoad(profile._id)
      .then((messages) =>
        setPreviewInfo({
          message: messages.messages[0].content + '...',
          createdAt: messages.messages[0].createdAt
        })
      )
      .then(() => setIsLoading(false));
  }, [profile]);

  return (
    <div className="thread-list">
      <div className="thread-list-wrapper">
        {!isLoading && (
          <Link to={`/message/${profile._id}`} className="message-card">
            <div>
              <img src={profile.picture} alt={profile.name} />
            </div>
            <div>
              <small>
                {new Date(previewInfo.createdAt).toLocaleDateString('de-DE')}
              </small>
              <h4>{profile.name}</h4>

              <small>{previewInfo.message}</small>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ThreadPreviewComponent;
