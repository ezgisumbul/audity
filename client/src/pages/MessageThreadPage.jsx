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
      {!isLoading && (
        <>
          {(threads.length !== 0 && (
            <>
              <h1>Your messages</h1>
              <ul>
                {threads.map((thread) => (
                  <li key={thread._id}>
                    <ThreadPreviewCard profile={thread} />
                  </li>
                ))}
              </ul>
            </>
          )) || (
            <div className="message-empty-state-wrapper">
              <div className="message-empty-state">
                <div>
                  <h1>
                    You don't have any messages. Find content creators and start
                    conversation.
                  </h1>
                </div>

                <button className="btn">
                  <Link to="/sound/search">Find Users</Link>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageThreadPage;
