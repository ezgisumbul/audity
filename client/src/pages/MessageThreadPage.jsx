import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { messageThreadList } from '../services/message';
import './MessageThreadPage.scss';

const MessageThreadPage = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    messageThreadList().then((data) => {
      setThreads(data.threads);
    });
  }, []);

  return (
    <div>
      {threads.map((thread) => (
        <li key={thread._id}>
          <Link to={`/message/${thread._id}`}>
            {/* <img src={thread.picture} alt={thread.name} /> */}
            {thread.name}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default MessageThreadPage;
