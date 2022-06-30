import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';
import {
  messageSend,
  messageThreadList,
  messageThreadLoad
} from '../services/message';
import formateDate from '../utils/format-date';
import './MessageDetailPage.scss';

const MessageDetailPage = () => {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    messageThreadLoad(id).then((data) => setMessages(data.messages));
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
    <div>
      {/* //Shows  ALL users the person has threads with. I just want to show the onbe who is owner of the thread */}
      {threads.length && (
        <div className="message-user">
          <img src={threads[0].picture} alt="" width="100px" />
          <span>{threads[0].name}</span>
        </div>
      )}
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message._id}
            className={
              message.sender === user._id ? 'message-sent' : 'message-received'
            }
          >
            <small>{formateDate(message.createdAt)}</small>
            <br />
            <span>{message.content}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleMessageFormSubmission}>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default MessageDetailPage;
