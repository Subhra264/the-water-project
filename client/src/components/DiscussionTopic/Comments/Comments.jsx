import { useState, useEffect, useRef } from 'react';
import Comment from './Comment/Comment';
import CommentEditor from '../../ContentEditor/CommentEditor/CommentEditor';
import Loader from '../../Loader/Loader';
import './Comments.scss';
import { getRequest, protectedRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';

export default function Comments (props) {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const onAddCommentClick = useRef(null);
    
    useEffect(() => {

        const successHandler = (result) => {
            setComments(result.results);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            console.log('Error fetching comments:', errMessage);
        };

        getRequest(props.fetchURI, getAccessTokenFromStorage(), successHandler, errorHandler);
    }, []);

    onAddCommentClick.current = (ev, content) => {

        const successHandler = (result) => {
            setComments([...comments, result]);

            ev.target.disabled = false;
            ev.target.innerText = 'Comment';
        };

        const errorHandler = (errMessage) => {
            console.log('Error adding comment', errMessage);
        };

        // POST request to add the comment
        const fetchDetails = {
            fetchURI: `${props.fetchURI}/`,
            method: 'POST',
            body: {
                content
            }
        };

        protectedRequest(fetchDetails, getAccessTokenFromStorage(), successHandler, errorHandler);
    };

    return (
        <div className='comments'>
            {
                loading? 
                    <Loader width='4em' />
                :
                    <>
                        {
                            !comments.length?
                                <div className="no-results-container">
                                    <div className="no-results">No Comments</div>
                                </div>
                            :
                                comments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        {...comment}
                                        baseURI={`${props.fetchURI}/${comment.id}`}
                                    />
                                ))
                        }
                        <CommentEditor onAddCommentClick={onAddCommentClick.current} />
                    </>
            }
        </div>
    );
}