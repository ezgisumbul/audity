import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import {
  messageSend,
  messageThreadList,
  messageThreadLoad
} from '../services/message';
import { profileLoad } from '../services/profile';
import formateDate from '../utils/format-date';
import './MessageDetailPage.scss';

const MessageDetailPage = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    profileLoad(id)
      .then((data) => {
        setProfile(data.profile);
        return messageThreadLoad(id);
      })
      .then((data) => setMessages(data.messages));
  }, [id]);

  useEffect(() => {
    messageThreadList().then((data) => {
      const allThreads = data.threads;
      setThreads(
        allThreads.filter((elem) =>
          messages.find((message) => elem._id === message.sender)
        )
      );
    });
  }, [messages]);

  const handleMessageFormSubmission = (event) => {
    event.preventDefault();
    messageSend(id, { content })
      .then((data) => {
        setContent('');
        setMessages([...messages, data.message]);
      })
      .catch((error) => console.log(error));
  };

  const { user } = useContext(AuthenticationContext);

  return (
    <div className="message-detail-page">
      <hr />
      {/* //Shows  ALL users the person has threads with. I just want to show the onbe who is owner of the thread */}
      {profile && (
        <div className="message-user-wrapper">
          <div className="message-user">
            <img src={profile.picture} alt="" width="100px" />
            <span>{profile.name}</span>
          </div>
        </div>
      )}
      <div className="background">
        <div className="message-list">
          {messages.map((message) => (
            <div
              key={message._id}
              className={
                message.sender === user._id
                  ? 'message-sent'
                  : 'message-received'
              }
            >
              <small>{formateDate(message.createdAt)}</small>
              <br />
              <span>{message.content}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="input-fixed">
        <hr />
        <form
          onSubmit={handleMessageFormSubmission}
          className="background send-form"
        >
          <div className="message-send-field">
            <textarea
              rows="1"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <div>
              <button>Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageDetailPage;
