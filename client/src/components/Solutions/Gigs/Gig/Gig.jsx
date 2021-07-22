import { Link } from 'react-router-dom';
import { parseDate } from '../../../../utils/date';
import './Gig.scss';

export default function Gig (props) {
    return (
        <div className="gig">
            <div className="gig-img"></div>
            <div className="gig-details">
                <div className="gig-information">
                    <div className="gig-by">
                        <div className="gig-by-img"></div>
                        <div className="gig-by-name">{props.creator.username}</div>
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