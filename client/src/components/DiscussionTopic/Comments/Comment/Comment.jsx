import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import useViewport from '../../../../hooks/useViewport';
import { parseDate } from '../../../../utils/date';
import parseHTML from '../../../../utils/parseHTML';
import Like from '../../../IconButton/Like';
import './Comment.scss';

export default function Comment (props) {
    const { isMobile } = useViewport();

    return (
        <div className={`topic-comment-container ${isMobile? 'mobile' : ''}`}>
            <div className="topic-comment-header">
                <div className="topic-comment-by">
                    <div className="topic-comment-by-profile-img">
                        {
                            props.creator.profile_pic? 
                                <img 
                                    src={props.creator.profile_pic}
                                    alt={`Profile Pic of ${props.creator.username}`}
                                    className='profile-pic-user-img'
                                />
                            :
                                <FontAwesomeIcon icon='user-circle' className='profile-pic-user-circle'/>
                        }
                    </div>
                    <div className="topic-comment-by-username">
                        <Link to={`/discussion/users/${props.creator.id}`} >{props.creator.username}</Link>
                    </div>
                </div>
                {/* TODO: Create a menu item for comment */}
                {/* <div className="topic-comment-header-menu"><FontAwesomeIcon icon='ellipsis-v' /></div> */}
            </div>
            <div className="topic-comment-description">
                {parseHTML(props.content)}
            </div>
            <div className="topic-comment-footer">
                <div className="topic-comment-footer-impressions">
                    {/* <div className="topic-comment-footer-impression"><FontAwesomeIcon icon='arrow-up' color="#37731B"/> <b>{props.likes.no_of_likes}</b></div> */}
                    <Like 
                        userLiked={props.likes.user_liked}
                        noOfLikes={props.likes.no_of_likes}
                        fetchURI={`${props.baseURI}/add-remove-likes/`}
                    />
                    {
                        props.isDescription && <div className="topic-comment-footer-impression" title='Views'>
                            <FontAwesomeIcon icon='eye' color="#37731B" />&nbsp;
                            <b>{props.views}</b>
                        </div>
                    }
                </div>
                <div className="topic-comment-footer-date">Commented on {parseDate(props.date)}</div>
            </div>
        </div>
    );
}