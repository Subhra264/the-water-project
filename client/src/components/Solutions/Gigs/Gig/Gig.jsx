import './Gig.scss';

export default function Gig (props) {
    return (
        <div className="gig">
            <div className="gig-img"></div>
            <div className="gig-details">
                <div className="gig-information">
                    <div className="gig-by">
                        <div className="gig-by-img"></div>
                        <div className="gig-by-name">{props.user.username}</div>
                    </div>
                    <div className="gig-last-updated-date">15/08/2019</div>
                </div>
                <div className="gig-brief-description">
                    {props.title}
                </div>
                <div className="gig-article-link">Show More</div>
            </div>
        </div>
    );
}