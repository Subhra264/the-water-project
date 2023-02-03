import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TopicContext } from '../../../utils/contexts';
import { getRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';
import Loader from '../../Loader/Loader';
import './Contributors.scss';

export default function Contributors(props) {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { topicId } = useContext(TopicContext);

  useEffect(() => {
    const successHandler = (result) => {
      setContributors(result);
      setLoading(false);
    };

    const errorHandler = (errMessage) => {
      console.log('Error fetching Contributors', errMessage);
    };

    getRequest(
      `/topics/${topicId}/contributors/`,
      getAccessTokenFromStorage(),
      successHandler,
      errorHandler,
    );
  }, [topicId]);

  return (
    <div className="contributors">
      {loading ? (
        <Loader width="4em" />
      ) : (
        contributors.map((contributor) => (
          <div className="contributor" key={contributor.id}>
            <span className="contributor-profile-pic">
              {contributor.profile_pic ? (
                <img
                  src={contributor.profile_pic}
                  title="Profile Pic"
                  alt={`Profile Pic of ${contributor.username}`}
                  className="profile-pic-user-img"
                />
              ) : (
                <FontAwesomeIcon
                  icon="user-circle"
                  className="profile-pic-user-circle"
                />
              )}
            </span>
            <Link to={`/discussion/users/${contributor.id}`}>
              <span className="contributor-username">
                {contributor.username}
              </span>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
