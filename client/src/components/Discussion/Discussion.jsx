import { Switch, Route, Redirect } from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import TopicEditor from '../ContentEditor/TopicEditor/TopicEditor';
import DiscussionTopic from '../DiscussionTopic/DiscussionTopic';
import './Discussion.scss';
import useViewport from '../../hooks/useViewport';
import NGOProfile from '../Profile/NGOProfile';
import UserProfile from '../Profile/UserProfile';
import NGOForm from '../NGOForm/NGOForm';
import JoinNGO from '../Profile/JoinNGO/JoinNGO';
import DiscussionHome from './DiscussionHome';

export default function Discussion(props) {
  const { isMobile } = useViewport();
  const matchURL = useMatchURL();

  return (
    <div className="discussion">
      <Switch>
        <Route path={`${matchURL}`} exact>
          <div className={`discussion-home ${isMobile ? 'mobile' : ''}`}>
            <DiscussionHome />
          </div>
        </Route>
        <Route path={`${matchURL}/new-topic`} exact>
          <TopicEditor />
        </Route>
        <Route path={`${matchURL}/topics/:topicId`}>
          <DiscussionTopic />
        </Route>
        <Route path={`${matchURL}/users/:profileId`} exact>
          <UserProfile />
        </Route>
        <Route path={`${matchURL}/ngos/:profileId`}>
          <NGOProfile />
        </Route>
        <Route path={`${matchURL}/create-ngo`} exact>
          <NGOForm />
        </Route>
        <Route path={`${matchURL}/join-ngo/:ngoId/:joinToken`} exact>
          <JoinNGO />
        </Route>
        <Route>
          <Redirect to="/not-found" />
        </Route>
      </Switch>
    </div>
  );
}
