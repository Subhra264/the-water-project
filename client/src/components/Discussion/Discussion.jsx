import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Filters from './Filters/Filters';
import TopicFinder from './TopicFinder/TopicFinder';
import DiscussionTopic from '../DiscussionTopic/DiscussionTopic';
import './Discussion.scss';
import useViewport from '../../hooks/useViewport';

export default function Discussion(props) {
    const { isMobile } = useViewport();
    const match = useRouteMatch();

    return (
        <div className="discussion">
            <Switch>
                <Route path={`${match.url}`} exact>
                    <div className={`discussion-home ${isMobile? 'mobile' : ''}`}>
                        <Filters />
                        <TopicFinder />
                    </div>
                </Route>
                <Route path={`${match.url}/topic/:topicId`}>
                    <DiscussionTopic />
                </Route>
            </Switch>
        </div>
    );
}