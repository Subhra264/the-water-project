import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { useRef } from 'react';
import useViewport from '../../hooks/useViewport';
import Comment from './Comment/Comment';
import Slider from '../Slider/Slider';
import './DiscussionTopic.scss';
import Issues from './Issues/Issues';

export default function DiscussionTopic(props) {
    const { isMobile } = useViewport();
    const match = useRouteMatch();
    
    // Labels for the Slider component
    const labels = useRef([
        {
            name: 'Description',
            linkTo: `${match.url}/description`,
            ref: useRef()
        },
        {
            name: 'Issues',
            linkTo: `${match.url}/issues`,
            ref: useRef()
        },
        {
            name: 'Progress Report',
            linkTo: `${match.url}/progress-report`,
            ref: useRef()
        },
        {
            name: 'Discussion',
            linkTo: `${match.url}/discussion`,
            ref: useRef()
        }
    ]);

    console.log('Match URL for DiscussionTopic :', match.url);

    return (
        <div className='discussion-topic-container'>
            <div className="associated-ngo">
                <div className="ngo-logo"></div>
                <div className="ngo-name">Mozilla</div>
            </div>
            <div className={`discussion-topic ${isMobile? 'mobile' : ''}`}>
                <div className={`topic-number ${isMobile? 'mobile' : ''}`}>#14</div>
                <div className="topic-details">
                    <div className="topic-title">
                        The Title that changed my world
                    </div>
                    <div className="topic-date">
                        Opened by <i className='topic-opened-by'>@john12</i> on 25th June
                    </div>
                    <div className="topic-labels">
                        <i>Labels:</i>
                        <div className="topic-label">Help Wanted</div>
                        <div className="topic-label">Help Wanted</div>
                        <div className="topic-label">Help Wanted</div>
                    </div>
                    {
                        /* TODO:  */
                    // <Slider>
                    //     <Slider.Label linkTo={`${match.url}/description`}>Description</Slider.Label>
                    //     <Slider.Label linkTo={`${match.url}/issues`}>Issues</Slider.Label>
                    //     <Slider.Label linkTo={`${match.url}/progress-report`}>Progress Report</Slider.Label>
                    //     <Slider.Label linkTo={`${match.url}/discussion`}>Discussion</Slider.Label>
                    // </Slider> 
                    }

                    <Slider labels={labels.current}/>

                    <Switch>
                        <Route path={`${match.url}/description`}>
                            <Comment />
                        </Route>
                        <Route path={`${match.url}/issues`}>
                            <Issues />
                        </Route>
                        <Route path={`${match.url}/progress-report`}>
                            This is the progress Report
                        </Route>
                        <Route path={`${match.url}/discussion`}>
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}