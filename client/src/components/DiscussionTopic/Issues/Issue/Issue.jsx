import Comments from "../../Comments/Comments";
// import Comment from '../../Comments/Comment/Comment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef, useContext } from "react";
import "./Issue.scss";
import useViewport from "../../../../hooks/useViewport";
import { TopicContext } from "../../../../utils/contexts";
import Loader from "../../../Loader/Loader";
import Description from "../../Description/Description";
import { parseDate } from "../../../../utils/date";
import { getRequest } from "../../../../utils/fetch-request";
import { getAccessTokenFromStorage } from "../../../../utils/manage-tokens";
import { Link } from "react-router-dom";

function IssueThread(props) {
  const [issueDescription, setIssueDescription] = useState({});
  const [loading, setLoading] = useState(true);
  const [isClosed, setIsClosed] = useState(props.isClosed);
  const { topicId } = useContext(TopicContext);

  useEffect(() => {
    const successHandler = (result) => {
      setIssueDescription(result);
      setLoading(false);
    };

    const errorHandler = (errMessage) => {
      console.log("Error fetching issue description", errMessage);
    };

    // Fetch the description api
    getRequest(
      `/topics/${topicId}/issues/${props.issueId}/description/`,
      getAccessTokenFromStorage(),
      successHandler,
      errorHandler
    );
  }, []);

  return (
    <div className={`discussion-topic-issue-description ${props.display}`}>
      {loading ? (
        <Loader width="3em" />
      ) : (
        <>
          <Description
            description={issueDescription}
            baseURI={`/topics/${topicId}/issues/${props.issueId}/description`}
            isClosed={isClosed}
            setIsClosed={setIsClosed}
            closeBaseURI={`/topics/${topicId}/issues/close-issue`}
            problemId={props.issueId}
            problemType="Issue"
          />
          <Comments
            fetchURI={`/topics/${topicId}/issues/${props.issueId}/comments`}
          />
        </>
      )}
    </div>
  );
}

export default function Issue(props) {
  const { isMobile } = useViewport();
  const [showComments, setShowComments] = useState(false);
  const shouldLoadComment = useRef(false);

  const toggleShowComments = () => {
    if (!shouldLoadComment.current) shouldLoadComment.current = true;
    setShowComments(!showComments);
  };

  return (
    <div className="discussion-topic-issue">
      <div
        className={`discussion-topic-issue-header ${isMobile ? "mobile" : ""}`}
      >
        <div className="discussion-topic-issue-is-closed">
          <FontAwesomeIcon
            icon={["far", `${props.is_closed ? "check-circle" : "dot-circle"}`]}
          />
          &nbsp;
          {isMobile ? "" : props.is_closed ? "Closed" : "Open"}
        </div>
        <div className="discussion-topic-issue-title">
          <div className="issue-title">{props.title}</div>
          <div className="issue-meta-data">
            <span>
              opened by{" "}
              <Link to={`/discussion/users/${props.creator.user.id}`}>
                <i>@{props.creator.user.username}</i>
              </Link>{" "}
              on {parseDate(props.date)}{" "}
            </span>
            <span className="issue-tags">
              {props.tags.map((tag) => (
                <span className="issue-tag" key={tag.id}>
                  {tag.name}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="discussion-topic-issue-meta">
          <div
            className="discussion-topic-issue-meta-data"
            title="No of comments"
          >
            <FontAwesomeIcon icon="comments" /> {props.no_of_comments}
          </div>
          <div
            className="discussion-topic-issue-meta-data"
            onClick={toggleShowComments}
          >
            <FontAwesomeIcon
              icon={`${showComments ? "chevron-up" : "chevron-down"}`}
            />
          </div>
        </div>
      </div>
      {shouldLoadComment.current && (
        <IssueThread
          display={showComments ? "" : "display-none"}
          issueId={props.id}
          isClosed={props.is_closed}
        />
      )}
    </div>
  );
}
