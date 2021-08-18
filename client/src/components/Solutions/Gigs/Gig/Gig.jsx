import { Link } from 'react-router-dom';
import { parseDate } from '../../../../utils/date';
import './Gig.scss';
import defaultBlogThumbnail from '../../../../assets/img/default_image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Gig (props) {
    return (
        <div className="gig">
            <div className="gig-img">
                <img 
                    src={props.front_img? props.front_img : defaultBlogThumbnail}
                    title={`Front Image of ${props.title}`}
                    alt={`${props.title}`}
                />
            </div>
            <div className="gig-details">
                <div className="gig-information">
                    <div className="gig-by">
                        <div className="gig-by-img">
                            {
                                props.creator.profile_pic?
                                    <img 
                                        src={props.creator.profile_pic}
                                        title={`Profile pic of ${props.creator.username}`}
                                        alt={`${props.creator.username}`}
                                        className='profile-pic-user-img'
                                    />
                                :
                                    <FontAwesomeIcon icon='user-circle' className='profile-pic-user-circle' />
                            }
                        </div>
                        <div className="gig-by-name">
                            <Link to={`/discussion/users/${props.creator.id}`}>{props.creator.username}</Link>
                        </div>
                    </div>
                    <div className="gig-last-updated-date">{parseDate(props.date)}</div>
                </div>
                <div className="gig-brief-description">
                    {props.title}
                </div>
                <div className="gig-article-link" >
                    <Link to={`/solutions/blogs/${props.id}`} >Read More</Link>
                </div>
            </div>
        </div>
    );
}