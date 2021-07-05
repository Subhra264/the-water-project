import useViewport from '../../hooks/useViewport';
import Comment from './Comment/Comment';
import './DiscussionTopic.scss';

export default function DiscussionTopic(props) {
    const { isMobile } = useViewport();

    return (
        <div className='discussion-topic-container'>
            <div className="associated-ngo">
                <div className="ngo-logo"></div>
                <div className="ngo-name">Mozilla</div>
            </div>
            <div className={`discussion-topic ${isMobile? 'mobile' : ''}`}>
                <div className={`topic-number ${isMobile? 'mobile' : ''}`}>#14</div>
                <div className="topic-details">
                    <div className="topic-title">
                        The Title that changed my world
                    </div>
                    <div className="topic-date">
                        Opened by <i className='topic-opened-by'>@john12</i> on 25th June
                    </div>
                    <div className="topic-labels">
                        <i>Labels:</i>
                        <div className="topic-label">Help Wanted</div>
                        <div className="topic-label">Help Wanted</div>
                        <div className="topic-label">Help Wanted</div>
                    </div>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </div>
        </div>
    )
}