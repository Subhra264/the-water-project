import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useViewport from '../../../../hooks/useViewport';
import './Comment.scss';

export default function (props) {
    const { isMobile } = useViewport();

    return (
        <div className={`topic-comment-container ${isMobile? 'mobile' : ''}`}>
            <div className="topic-comment-header">
                <div className="topic-comment-by">
                    <div className="topic-comment-by-profile-img"></div>
                    <div className="topic-comment-by-username">{props.user.username}</div>
                </div>
                <div className="topic-comment-header-menu"><FontAwesomeIcon icon='ellipsis-v' /></div>
            </div>
            <div className="topic-comment-description">
                {props.content}
            </div>
            <div className="topic-comment-footer">
                <div className="topic-comment-footer-impressions">
                    <div className="topic-comment-footer-impression"><FontAwesomeIcon icon='arrow-up' color="#37731B"/> <b>{props.likes.no_of_likes}</b></div>
                    {
                        props.isDescription && <div className="topic-comment-footer-impression">
                            <FontAwesomeIcon icon='eye' color="#37731B" />&nbsp;
                            <b>{props.views}</b>
                        </div>
                    }
                </div>
                <div className="topic-comment-footer-date">Commented on 25th June</div>
            </div>
        </div>
    );
}