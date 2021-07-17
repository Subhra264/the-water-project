import { Switch, Route } from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import Filters from './Filters/Filters';
import TopicFinder from './TopicFinder/TopicFinder';
import TopicEditor from '../ContentEditor/TopicEditor/TopicEditor';
import DiscussionTopic from '../DiscussionTopic/DiscussionTopic';
import './Discussion.scss';
import useViewport from '../../hooks/useViewport';

export default function Discussion(props) {
    const { isMobile } = useViewport();
    const matchURL = useMatchURL();

    return (
        <div className="discussion">
            <Switch>
                <Route path={`${matchURL}`} exact>
                    <div className={`discussion-home ${isMobile? 'mobile' : ''}`}>
                        <Filters />
                        <TopicFinder />
                    </div>
                </Route>
                <Route path={`${matchURL}/new-topic`}>
                    <TopicEditor />
                </Route>
                <Route path={`${matchURL}/topic/:topicId`}>
                    <DiscussionTopic />
                </Route>
            </Switch>
        </div>
    );
}