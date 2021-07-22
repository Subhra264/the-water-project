import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './IconButton.scss';

export default function Like (props) {
    const [liked, setLiked] = useState(props.userLiked);
    const [noOfLikes, setNoOfLikes] = useState(props.noOfLikes);

    const toggleLike = (ev) => {
        fetch(`${props.fetchURI}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log('Liked thing', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);

            setLiked(result.likes.user_liked);

            let updatedNoOfLikes;
            if (liked) {
                updatedNoOfLikes = noOfLikes + 1;
            } else {
                updatedNoOfLikes = noOfLikes - 1;
            }

            setNoOfLikes(updatedNoOfLikes);
        })
        .catch(err => {
            console.log('Error liking the content', err.message);
        });
    };

    return (
        <span className='icon-button'>
            <span className="icon" onClick={toggleLike} title='like'>
                {
                    <FontAwesomeIcon icon={liked? 'heart' : ['far', 'heart']} />
                }
            </span>
            <span className="icon-details" title='No of Likes'>
                {noOfLikes}
            </span>
        </span>
    );
}