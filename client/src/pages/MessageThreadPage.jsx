import { useEffect, useState } from "react";
import { messageThreadList } from "../services/message";
import ThreadPreviewCard from "./../components/ThreadPreviewCard";
import "./MessageThreadPage.scss";

const MessageThreadPage = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    messageThreadList().then((data) => {
      setThreads(data.threads);
    });
  }, []);

  return (
    <div className="message-thread-list">
      {threads.map((thread) => (
        <li key={thread._id}>
          <ThreadPreviewCard profile={thread} />
        </li>
      ))}
    </div>
  );
};

export default MessageThreadPage;
