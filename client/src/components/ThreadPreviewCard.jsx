import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { messageThreadLoad } from "../services/message";

const ThreadPreviewComponent = ({ profile }) => {
  const [previewInfo, setPreviewInfo] = useState({
    message: "",
    createdAt: "some time ago",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    messageThreadLoad(profile._id)
      .then((messages) =>
        setPreviewInfo({
          message: messages.messages[0].content + "...",
          createdAt: messages.messages[0].createdAt,
        })
      )
      .then(() => setIsLoading(false));
  }, [profile]);

  return (
    <div>
      {!isLoading && (
        <Link to={`/message/${profile._id}`}>
          <div>
            <img src={profile.picture} alt="" />
          </div>
          <div>
            <small>
              {new Date(previewInfo.createdAt).toLocaleDateString("de-DE")}
            </small>
            <h2>{profile.name}</h2>

            <p>{previewInfo.message}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ThreadPreviewComponent;
