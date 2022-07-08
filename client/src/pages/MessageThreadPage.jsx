import { useEffect, useState } from 'react';
import { messageThreadList } from '../services/message';
import ThreadPreviewCard from './../components/ThreadPreviewCard';
import { Link } from 'react-router-dom';
import './MessageThreadPage.scss';

const MessageThreadPage = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    messageThreadList()
      .then((data) => {
        setThreads(data.threads);
      })
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div className="message-thread-list">
      <h1>Your messages</h1>

      {!isLoading && (
        <>
          {(threads.length !== 0 && (
            <ul>
              {threads.map((thread) => (
                <li key={thread._id}>
                  <ThreadPreviewCard profile={thread} />
                </li>
              ))}
            </ul>
          )) || (
            <>
              <p>
                You have not started a Conversation with any user yet. Find
                other sound lovers and start your first conversation.
              </p>
              <button>
                <Link to="/sound/search">Find Users</Link>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MessageThreadPage;
