import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMatchURL } from '../../../hooks/useMatch';
import useViewport from '../../../hooks/useViewport';
import { parseDate } from '../../../utils/date';
import Card from '../../Card/Card';
import Loader from '../../Loader/Loader';
import './SearchResult.scss';

export default function SearchResult(props) {
    const { isMobile } = useViewport();
    const matchURL = useMatchURL();
    const [topicList, setTopicList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all the topics 
        fetch('/topics/')
        .then(res => res.json())
        .then(result => {
            console.log('Topics', result.topics);
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
            setTopicList(result.topics);
            setLoading(false);
        }).catch(err => {
            console.log('Error fetching topics', err.message);
        });

    }, []);

    return (
        <div className='search-result'>
            {
                loading?
                    <Loader width='4em' />
                :
                    topicList.length === 0?
                        <div className="no-results-container">
                            <div className="no-results">No Topics</div>
                        </div>
                    :
                        topicList.map(topic => (
                            <Link to={`${matchURL}/topic/${topic.id}/description`} key={topic.id}>
                                <Card className='result-box'>
                                    <Card.CardImg className='result-image'><div className="result-img"></div></Card.CardImg>
                                    <Card.CardDetails className='result-data'>
                                        <div className={`result-description-container ${isMobile? 'mobile' : ''}`}>
                                            <div className="result-description">
                                                <div className="result-title">{topic.topic_details.description.title}</div>
                                                <div className="result-date"><i className='result-issue-number'>#{topic.id}</i> opened on {parseDate(topic.topic_details.description.date)} </div>
                                                <div className="result-brief-description">{topic.topic_details.description.brief_description}</div>
                                            </div>
                                            <div className={`result-opened-by ${isMobile? 'mobile' : ''}`}>
                                                {
                                                    topic.topic_details.opened_by.org && <div className="result-opener">
                                                        <div className="result-opener-profile-pic"></div>
                                                        <div className="result-opener-name">{topic.topic_details.opened_by.org.name}</div>
                                                    </div>
                                                }
                                                <div className="result-opener">
                                                    <div className="result-opener-profile-pic"></div>
                                                    <div className="result-opener-name">{topic.topic_details.opened_by.user.username}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="result-meta-information">
                                            <div className="result-tags-container">
                                                {
                                                    topic.topic_details.meta_data.tags.map(tag => (
                                                        <div className="result-tag" key={tag.id} >{tag.name}</div>
                                                    ))
                                                }
                                            </div>
        
                                            {/* TODO: topic must contain the no_of_comments properties */}
                                            <div className="result-impressions">
                                                <div className="result-impression result-status">
                                                    <FontAwesomeIcon icon={['far', `${topic.topic_details.meta_data.is_closed? 'check-circle' : 'dot-circle'}`]} />&nbsp;
                                                    <i>{topic.topic_details.meta_data.is_closed? 'Closed' : 'Open'}</i>
                                                </div>
                                                <div className="result-impression result-comments">
                                                    <FontAwesomeIcon icon='comment-alt' />
                                                    <i>{topic.topic_details.meta_data.no_of_comments}</i>
                                                </div>
                                                <div className="result-impression result-upvotes">
                                                    <FontAwesomeIcon icon='heart' />
                                                    <i>{topic.topic_details.meta_data.upvotes}</i>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.CardDetails>
                                </Card>
                            </Link>
                        ))
            }
        </div>
    );
}