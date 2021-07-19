import Comments from '../../Comments/Comments';
import Comment from '../../Comments/Comment/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef, useContext } from 'react';
import './Issue.scss';
import useViewport from '../../../../hooks/useViewport';
import { TopicContext } from '../../../../utils/contexts';
import Loader from '../../../Loader/Loader';

function IssueThread (props) {
    const [issueDescription, setIssueDescription] = useState({});
    const [loading, setLoading] = useState(true);
    const { topicId } = useContext(TopicContext);

    useEffect(() => {
        // Fetch the description api
        fetch(`/topics/${topicId}/issues/${props.issueId}/description/`)
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            console.log('Issue Description', result);
            setIssueDescription(result);
            setLoading(false);
        }).catch(err => {
            console.log('Error fetching issue description');
        });
    }, []);

    return (
        <div className={`discussion-topic-issue-description ${props.display}`}>
            {
                loading? 
                    <Loader />
                :
                    <>
                        <Comment isDescription {...issueDescription} />
                        <Comments fetchURI={`/topics/${topicId}/issues/${props.issueId}/`} />
                    </>
            }
        </div>
    );
}

export default function Issue (props) {
    const { isMobile } = useViewport();
    const [showComments, setShowComments] = useState(false);
    const shouldLoadComment = useRef(false);

    const toggleShowComments = () => {
        if (!shouldLoadComment.current) shouldLoadComment.current = true;
        setShowComments(!showComments);
    };

    return (
        <div className="discussion-topic-issue">

            <div className={`discussion-topic-issue-header ${isMobile? 'mobile' : ''}`}>
                <div className="discussion-topic-issue-is-closed">
                    <FontAwesomeIcon icon={['far', `${props.is_closed? 'check-circle' : 'dot-circle'}`]} />&nbsp;
                    {isMobile? '' : props.is_closed? 'Closed' : 'Open'}
                </div>
                <div className="discussion-topic-issue-title">
                    <div className="issue-title">{props.title}</div>
                    <div className="issue-meta-data">
                        opened by <i>{props.creator.username}</i> yesterday
                    </div>
                </div>
                <div className="discussion-topic-issue-meta">
                    <div className="discussion-topic-issue-meta-data">
                        <FontAwesomeIcon icon='comments' /> {props.no_of_comments}
                    </div>
                    <div className="discussion-topic-issue-meta-data" onClick={toggleShowComments} >
                        <FontAwesomeIcon icon={`${showComments? 'chevron-up' : 'chevron-down'}`} />
                    </div>
                </div>
            </div>
            {
                shouldLoadComment.current && <IssueThread display={showComments? '' : 'display-none'} issueId={props.id} />
            }
        </div>
    )
}