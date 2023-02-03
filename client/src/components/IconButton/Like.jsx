import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { protectedRequest } from '../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../utils/manage-tokens';
import './IconButton.scss';

export default function Like(props) {
  const [liked, setLiked] = useState(props.userLiked);
  const [noOfLikes, setNoOfLikes] = useState(props.noOfLikes);

  // Called when the PATCH request is successful
  const successHandler = (result) => {
    setLiked(result.likes.user_liked);

    let updatedNoOfLikes;
    if (result.likes.user_liked) {
      updatedNoOfLikes = noOfLikes + 1;
    } else {
      updatedNoOfLikes = noOfLikes - 1;
    }

    setNoOfLikes(updatedNoOfLikes);
  };

  // Called when the PATCH request throws an error
  const errorHandler = (errMessage) => {
    console.log('Error liking the content', errMessage);
  };

  const toggleLike = (ev) => {
    const fetchDetails = {
      fetchURI: `${props.fetchURI}`,
      method: 'PATCH',
    };

    // PATCH request to toggle like
    protectedRequest(
      fetchDetails,
      getAccessTokenFromStorage(),
      successHandler,
      errorHandler,
    );
  };

  return (
    <span className="icon-button">
      <span className="icon" onClick={toggleLike} title="like">
        {<FontAwesomeIcon icon={liked ? 'heart' : ['far', 'heart']} />}
      </span>
      <span className="icon-details" title="No of Likes">
        {noOfLikes}
      </span>
    </span>
  );
}
