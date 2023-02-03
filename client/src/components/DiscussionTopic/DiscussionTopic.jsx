import {
  Switch,
  Route,
  useParams,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import { useContext, useEffect, useRef, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import Slider from '../Slider/Slider';
import './DiscussionTopic.scss';
import Issues from './Issues/Issues';
import Comments from './Comments/Comments';
import { TopicContext, UserContext } from '../../utils/contexts';
import ProgressReport from './ProgressReport/ProgressReport';
import Loader from '../Loader/Loader';
import Description from './Description/Description';
import { parseDate } from '../../utils/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRequest } from '../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../utils/manage-tokens';
import { includesOrg } from '../../utils/user-utils';
import Contributors from './Contributors/Contributors';

export default function DiscussionTopic(props) {
  const { isMobile } = useViewport();
  const [topicDetails, setTopicDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClosed, setIsClosed] = useState();
  const [administratorAccess, setAdministratorAccess] = useState(false);
  const matchURL = useMatchURL();
  const { topicId } = useParams();
  const { userState } = useContext(UserContext);
  const history = useHistory();

  // Labels for the Slider component
  const labels = useRef([
    {
      name: 'Description',
      linkTo: `${matchURL}/description`,
      ref: useRef(),
    },
    {
      name: 'Issues',
      linkTo: `${matchURL}/issues`,
      ref: useRef(),
    },
    {
      name: 'Progress Report',
      linkTo: `${matchURL}/progress-report`,
      ref: useRef(),
    },
    {
      name: 'Discussion',
      linkTo: `${matchURL}/discussion`,
      ref: useRef(),
    },
    {
      name: 'Contributors',
      linkTo: `${matchURL}/contributors`,
      ref: useRef(),
    },
  ]);

  useEffect(() => {
    const successHandler = (result) => {
      setTopicDetails(result);
      setIsClosed(result.is_closed);
      setLoading(false);
    };

    const errorHandler = (errMessage) => {
      console.log('Error fetching topic details', errMessage);
      if (errMessage === 'page_not_found') history.push('/not-found');
    };

    // Fetch the topic
    getRequest(
      `/topics/${topicId}`,
      getAccessTokenFromStorage(),
      successHandler,
      errorHandler,
    );
  }, [topicId]);

  useEffect(() => {
    // Check if the user has administrator access for this topic
    if (userState && topicDetails) {
      console.log('');
      if (
        topicDetails.description.creator.id === +userState.id ||
        (topicDetails.creator.org &&
          (includesOrg(userState.owned_orgs, topicDetails.creator.org.id) ||
            includesOrg(userState.membered_orgs, topicDetails.creator.org.id)))
      ) {
        setAdministratorAccess(true);
      }
    }
  }, [topicDetails, userState]);

  return (
    <div className="discussion-topic-container">
      {loading ? (
        <Loader width="7em" />
      ) : (
        <>
          {topicDetails.creator.org && (
            <div className="associated-ngo">
              <div className="ngo-logo">
                {topicDetails.creator.org.profile_pic ? (
                  <img
                    src={topicDetails.creator.org.profile_pic}
                    title="NGO profile pic"
                    alt="NGO profile pic"
                    className="profile-pic-user-img"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="users"
                    className="profile-pic-user-circle"
                  />
                )}
              </div>
              <div className="ngo-name">
                <Link to={`/discussion/ngos/${topicDetails.creator.org.id}`}>
                  {topicDetails.creator.org.name}
                </Link>
              </div>
            </div>
          )}
          <div className={`discussion-topic ${isMobile ? 'mobile' : ''}`}>
            <div className={`topic-number ${isMobile ? 'mobile' : ''}`}>
              #{topicDetails.id}
            </div>
            <div className="topic-details">
              <div className="topic-title">{topicDetails.title}</div>
              <div className="topic-date">
                Opened by{' '}
                <Link
                  to={`/discussion/users/${topicDetails.description.creator.id}`}
                >
                  <i className="topic-opened-by">
                    @{topicDetails.description.creator.username}
                  </i>
                </Link>{' '}
                on {parseDate(topicDetails.date)}
              </div>
              <div className="topic-labels">
                <i>Labels:</i>
                {topicDetails.tags.map((tag) => (
                  <div className="topic-label" key={tag.id}>
                    {tag.name}
                  </div>
                ))}
              </div>
              <div className="topic-location-container">
                <i>
                  <FontAwesomeIcon icon="map-marker-alt" />
                </i>
                <span className="topic-location">
                  {topicDetails.city_or_area}, {topicDetails.country}
                </span>
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

              <Slider labels={labels.current} />

              <TopicContext.Provider
                value={{
                  topicId: topicDetails.id,
                  topicCreator: {
                    user: topicDetails.description.user,
                  },
                  administratorAccess,
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
                      closeBaseURI="/topics/close-topic"
                      problemId={topicDetails.id}
                      problemType="Topic"
                    />
                  </Route>
                  <Route path={`${matchURL}/issues`}>
                    <Issues />
                  </Route>
                  <Route path={`${matchURL}/progress-report`} exact>
                    <ProgressReport />
                  </Route>
                  <Route path={`${matchURL}/discussion`} exact>
                    <Comments
                      fetchURI={`/topics/${topicDetails.id}/comments`}
                    />
                  </Route>
                  <Route path={`${matchURL}/contributors`} exact>
                    <Contributors />
                  </Route>
                  <Route>
                    <Redirect to="/not-found" />
                  </Route>
                </Switch>
              </TopicContext.Provider>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
