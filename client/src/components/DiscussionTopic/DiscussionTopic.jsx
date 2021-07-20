import { Switch, Route, useParams } from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import { useEffect, useRef, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import Comment from './Comments/Comment/Comment';
import Slider from '../Slider/Slider';
import './DiscussionTopic.scss';
import Issues from './Issues/Issues';
import Comments from './Comments/Comments';
import { TopicContext } from '../../utils/contexts';
import ProgressReport from './ProgressReport/ProgressReport';
import Loader from '../Loader/Loader';
import Description from './Description/Description';

export default function DiscussionTopic(props) {
    const { isMobile } = useViewport();
    const [topicDetails, setTopicDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isClosed, setIsClosed] = useState();
    const matchURL = useMatchURL();
    const { topicId } = useParams();
    
    // Labels for the Slider component
    const labels = useRef([
        {
            name: 'Description',
            linkTo: `${matchURL}/description`,
            ref: useRef()
        },
        {
            name: 'Issues',
            linkTo: `${matchURL}/issues`,
            ref: useRef()
        },
        {
            name: 'Progress Report',
            linkTo: `${matchURL}/progress-report`,
            ref: useRef()
        },
        {
            name: 'Discussion',
            linkTo: `${matchURL}/discussion`,
            ref: useRef()
        }
    ]);

    useEffect(() => {
        // Fetch the topic
        fetch(`/topics/${topicId}`)
        .then(res => res.json())
        .then(result => {
            console.log('Topic', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);

            setTopicDetails(result);
            setIsClosed(result.is_closed);
            setLoading(false);

        }).catch(err => {
            console.log('Error fetching topic details', err);
        })
    }, []);

    return (
        <div className='discussion-topic-container'>
            {
                loading?
                    <Loader width='7em' />
                :
                    <>
                        {
                            topicDetails.creator.org && <div className="associated-ngo">
                                <div className="ngo-logo"></div>
                                <div className="ngo-name">{topicDetails.creator.org.name}</div>
                            </div>
                        }
                        <div className={`discussion-topic ${isMobile? 'mobile' : ''}`}>
                            <div className={`topic-number ${isMobile? 'mobile' : ''}`}>#{topicDetails.id}</div>
                            <div className="topic-details">
                                <div className="topic-title">
                                    {topicDetails.title}
                                </div>
                                <div className="topic-date">
                                    Opened by <i className='topic-opened-by'>@{topicDetails.description.user.username}</i> on 25th June
                                </div>
                                <div className="topic-labels">
                                    <i>Labels:</i>
                                    {
                                        topicDetails.tags.map(tag => (
                                            <div className="topic-label" key={tag}>{tag}</div>
                                        ))
                                    }
                                </div>
                                {
                                    /* TODO:  */
                                // <Slider>
                                //     <Slider.Label linkTo={`${matchURL}/description`}>Description</Slider.Label>
                                //     <Slider.Label linkTo={`${matchURL}/issues`}>Issues</Slider.Label>
                                //     <Slider.Label linkTo={`${matchURL}/progress-report`}>Progress Report</Slider.Label>
                                //     <Slider.Label linkTo={`${matchURL}/discussion`}>Discussion</Slider.Label>
                                // </Slider> 
                                }
            
                                <Slider labels={labels.current}/>
            
                                <TopicContext.Provider 
                                    value={{
                                        topicId: topicDetails.id,
                                        topicCreator: {
                                            user: topicDetails.description.user
                                        }
                                    }}
                                >
                                    <Switch>
                                        <Route path={`${matchURL}/description`} exact>
                                            {/* <Comment 
                                                isDescription 
                                                {...topicDetails.description}
                                                baseURI={`/topics/${topicDetails.id}/description`}
                                            /> */}
                                            <Description 
                                                description={topicDetails.description}
                                                baseURI={`/topics/${topicDetails.id}/description`}
                                                isClosed={isClosed}
                                                setIsClosed={setIsClosed}
                                                closeBaseURI='/topics'
                                                problemId={topicDetails.id}
                                            />
                                        </Route>
                                        <Route path={`${matchURL}/issues`}>
                                            <Issues />
                                        </Route>
                                        <Route path={`${matchURL}/progress-report`}>
                                            <ProgressReport />
                                        </Route>
                                        <Route path={`${matchURL}/discussion`}>
                                            <Comments fetchURI={`/topics/${topicDetails.id}/comments/`} />
                                        </Route>
                                    </Switch>
                                </TopicContext.Provider>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}