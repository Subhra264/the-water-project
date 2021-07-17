import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useViewport from '../../../hooks/useViewport';
import './Comment.scss';

export default function (props) {
    const { isMobile } = useViewport();

    return (
        <div className={`topic-comment-container ${isMobile? 'mobile' : ''}`}>
            <div className="topic-comment-header">
                <div className="topic-comment-by">
                    <div className="topic-comment-by-profile-img"></div>
                    <div className="topic-comment-by-username">john12</div>
                </div>
                <div className="topic-comment-header-menu"><FontAwesomeIcon icon='ellipsis-v' /></div>
            </div>
            <div className="topic-comment-description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, dicta saepe dolores doloribus vitae dolore deleniti accusantium animi minima cupiditate illo mollitia numquam quam expedita unde voluptates, accusamus dignissimos. Corrupti non tempora unde repellendus ad fuga culpa dolore quod repellat.
            </div>
            <div className="topic-comment-footer">
                <div className="topic-comment-footer-impressions">
                    <div className="topic-comment-footer-impression"><FontAwesomeIcon icon='arrow-up' color="#37731B"/> <b>1.5k</b></div>
                    <div className="topic-comment-footer-impression"><FontAwesomeIcon icon='eye' color="#37731B" /> <b>1.5k</b></div>
                </div>
                <div className="topic-comment-footer-date">Commented on 25th June</div>
            </div>
        </div>
    );
}