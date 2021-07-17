import Comment from '../../Comment/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import './Issue.scss';
import useViewport from '../../../../hooks/useViewport';

function IssueComments (props) {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch the API
    }, []);

    return (
        <div className="discussion-topic-issue-comments">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
}

export default function Issue (props) {
    const { isMobile } = useViewport();
    const [showComments, setShowComments] = useState(false);

    const toggleShowComments = () => {
        setShowComments(!showComments);
    };

    return (
        <div className="discussion-topic-issue">
            <div className={`discussion-topic-issue-header ${isMobile? 'mobile' : ''}`}>
                <div className="discussion-topic-issue-is-closed"><FontAwesomeIcon icon={['far', 'dot-circle']} /> {isMobile? '' : 'Open'}</div>
                <div className="discussion-topic-issue-title">
                    <div className="issue-title">Tatai got heart attack in his kidney</div>
                    <div className="issue-meta-data">
                        opened by <i>@john12</i> yesterday
                    </div>
                </div>
                <div className="discussion-topic-issue-toggle" onClick={toggleShowComments} ><FontAwesomeIcon icon={`${showComments? 'chevron-up' : 'chevron-down'}`} /></div>
            </div>
            {
                showComments?
                    <IssueComments />
                :
                    ''
            }
        </div>
    )
}