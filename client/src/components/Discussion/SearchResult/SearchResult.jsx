import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouteMatch, Link } from 'react-router-dom';
import useViewport from '../../../hooks/useViewport';
import Card from '../../Card/Card';
import './SearchResult.scss';

export default function SearchResult(props) {
    const { isMobile } = useViewport();
    const match = useRouteMatch();

    return (
        <div className='search-result'>
            <Link to={`${match.url}/topic/1/description`}>
                <Card className='result-box'>
                    <Card.CardImg className='result-image'><div className="result-img"></div></Card.CardImg>
                    <Card.CardDetails>
                        <div className={`result-description-container ${isMobile? 'mobile' : ''}`}>
                            <div className="result-description">
                                <div className="result-title">This title changed my life</div>
                                <div className="result-date"><i className='result-issue-number'>#14</i> opened on 25th June</div>
                                <div className="result-brief-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quasi magni nesciunt eligendi at ducimus exercitationem distinctio, quidem voluptas.</div>
                            </div>
                            <div className={`result-opened-by ${isMobile? 'mobile' : ''}`}>
                                <div className="result-opener">
                                    <div className="result-opener-profile-pic"></div>
                                    <div className="result-opener-name">Mozilla</div>
                                </div>
                                <div className="result-opener">
                                    <div className="result-opener-profile-pic"></div>
                                    <div className="result-opener-name">john12</div>
                                </div>
                            </div>
                        </div>
                        <div className="result-meta-information">
                            <div className="result-tags-container">
                                <div className="result-tag">India</div>
                                <div className="result-tag">India</div>
                                <div className="result-tag">India</div>
                            </div>
                            <div className="result-impressions">
                                <div className="result-impression result-status">
                                    <FontAwesomeIcon icon='dot-circle' />
                                    <i>Open</i>
                                </div>
                                <div className="result-impression result-comments">
                                    <FontAwesomeIcon icon='comment-alt' />
                                    <i>32</i>
                                </div>
                                <div className="result-impression result-upvotes">
                                    <FontAwesomeIcon icon='arrow-up' />
                                    <i>1.2k</i>
                                </div>
                            </div>
                        </div>
                    </Card.CardDetails>
                </Card>
            </Link>
        </div>
    );
}