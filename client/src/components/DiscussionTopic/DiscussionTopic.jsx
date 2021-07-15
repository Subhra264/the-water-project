import { Switch, Route } from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import { useRef } from 'react';
import useViewport from '../../hooks/useViewport';
import Comment from './Comment/Comment';
import Slider from '../Slider/Slider';
import './DiscussionTopic.scss';
import Issues from './Issues/Issues';

export default function DiscussionTopic(props) {
    const { isMobile } = useViewport();
    const matchURL = useMatchURL();
    
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
                    //     <Slider.Label linkTo={`${matchURL}/description`}>Description</Slider.Label>
                    //     <Slider.Label linkTo={`${matchURL}/issues`}>Issues</Slider.Label>
                    //     <Slider.Label linkTo={`${matchURL}/progress-report`}>Progress Report</Slider.Label>
                    //     <Slider.Label linkTo={`${matchURL}/discussion`}>Discussion</Slider.Label>
                    // </Slider> 
                    }

                    <Slider labels={labels.current}/>

                    <Switch>
                        <Route path={`${matchURL}/description`}>
                            <Comment />
                        </Route>
                        <Route path={`${matchURL}/issues`}>
                            <Issues />
                        </Route>
                        <Route path={`${matchURL}/progress-report`}>
                            This is the progress Report
                        </Route>
                        <Route path={`${matchURL}/discussion`}>
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}