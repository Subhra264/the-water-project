import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMatchURL } from '../../../hooks/useMatch';
import useViewport from '../../../hooks/useViewport';
import { parseDate } from '../../../utils/date';
import { getRequest } from '../../../utils/fetch-request';
import parseHTML from '../../../utils/parseHTML';
import Card from '../../Card/Card';
import Loader from '../../Loader/Loader';
import './SearchResult.scss';
import defaultTopicThumbnail from '../../../assets/img/default_image.jpg';
import useChangeEffect from '../../../hooks/useChangeEffect';

export default function SearchResult(props) {
    const { isMobile } = useViewport();
    const matchURL = useMatchURL();
    const [topicList, setTopicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState();
    const infinteScrollLoader = useRef(null);

    // Loads topics
    const loadTopic = (queryPageNo) => {
        const successHandler = (result) => {
            if (!result.topics.length || result.topics.length < 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setTopicList((oldTopicList) => [...oldTopicList, ...result.topics]);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            if (errMessage === 'page_not_found') {
                setHasMore(false);
                setLoading(false);
            }
        };

        let query = props.queryToSearch? `?${props.queryToSearch}` : '';
        let pageNo = page;
        if (queryPageNo) {
            pageNo = queryPageNo;
        }
        if (pageNo) {
            if (query) {
                query = `${query}&page=${pageNo}`;
            } else {
                query = `?page=${pageNo}`;
            }
        }
        // Fetch all the topics 
        getRequest(`/topics/${query}`, null, successHandler, errorHandler);
    };

    // Loads more topics
    const loadMoreTopic = () => {
        setPage((page) => {
            return page + 1;
        });
    };

    // Avoids the first run and runs the callback whenever the query changes
    useChangeEffect(() => {
        setLoading(true);
        setTopicList([]);
        setPage(1);

        loadTopic(1);
    }, [props.queryToSearch]);

    // Runs the callback whenever page changes
    useEffect(() => {

        if (page !== 1) {
            setLoading(true);
            loadTopic();
            if (!page) setPage(1);
        }

    }, [page]);

    return (
        <div className='search-result'>
            
            {
                topicList.map(topic => (
                    <Link to={`${matchURL}/topics/${topic.id}/description`} key={topic.id}>
                        <Card className='result-box'>
                            <Card.CardImg className='result-image'>
                                <div className="result-img">
                                    <img src={topic.img? topic.img : defaultTopicThumbnail} title={`Thumbnail image for ${topic.title}`} />
                                </div>
                            </Card.CardImg>
                            <Card.CardDetails className='result-data'>
                                <div className={`result-description-container ${isMobile? 'mobile' : ''}`}>
                                    <div className="result-description">
                                        <div className="result-title">{topic.topic_details.description.title}</div>
                                        <div className="result-date"><i className='result-issue-number'>#{topic.id}</i> opened on {parseDate(topic.topic_details.description.date)} </div>
                                        <div className="result-brief-description">{parseHTML(topic.topic_details.description.brief_description)}</div>
                                    </div>
                                    <div className={`result-opened-by ${isMobile? 'mobile' : ''}`}>
                                        {
                                            topic.topic_details.opened_by.org && <div className="result-opener">
                                                <div className="result-opener-profile-pic">
                                                    {
                                                        topic.topic_details.opened_by.org.profile_pic?
                                                            <img 
                                                                src={topic.topic_details.opened_by.org.profile_pic} 
                                                                title='NGO profile pic'
                                                                className='profile-pic-user-img'
                                                            />
                                                        :
                                                            <FontAwesomeIcon icon='users' className='profile-pic-user-circle' />
                                                    }
                                                </div>
                                                <div className="result-opener-name">{topic.topic_details.opened_by.org.name}</div>
                                            </div>
                                        }
                                        <div className="result-opener">
                                            <div className="result-opener-profile-pic">
                                                {
                                                    topic.topic_details.opened_by.user.profile_pic?
                                                        <img 
                                                            src={topic.topic_details.opened_by.user.profile_pic}
                                                            title={`Profile Pic of ${topic.topic_details.opened_by.user.username}`}
                                                            className='profile-pic-user-img' 
                                                        />
                                                    :
                                                        <FontAwesomeIcon icon='user-circle' className='profile-pic-user-circle'/>
                                                }
                                            </div>
                                            <div className="result-opener-name">{topic.topic_details.opened_by.user.username}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="result-meta-information">
                                    <div className="result-tags-container">
                                        {
                                            topic.topic_details.meta_data.tags.map(tag => (
                                                <div className="result-tag" key={tag} >{tag}</div>
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

            <div className="infinite-scroll-loader" ref={infinteScrollLoader} >
                {
                    loading?
                        <Loader width='4em' />
                    :
                        hasMore? 
                            <div className="load-more">
                                <button onClick={loadMoreTopic} >Load More</button>
                            </div>
                        :
                            <div className="no-results">No More Results</div>
                }
            </div>
        </div>
    );
}