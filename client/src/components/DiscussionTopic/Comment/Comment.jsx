import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Comment.scss';

export default function (props) {
    return (
        <div className="topic-comment-container">
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
                    <div className="topic-comment-footer-impression"><FontAwesomeIcon icon='arrow-up' /> 1.5k</div>
                    <div className="topic-comment-footer-impression"><FontAwesomeIcon icon='eye' /> 1.5k</div>
                </div>
                <div className="topic-comment-footer-date">Commented on 25th June</div>
            </div>
        </div>
    );
}