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
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const onAddCommentClick = useRef(null);
    
    const loadMoreComment = () => {
        setLoading(true);
        setPage((page) => page + 1);
    };

    useEffect(() => {

        const successHandler = (result) => {
            if (!result.next) setHasMore(false);
            setComments((comments) => [...comments, ...result.results]);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            console.log('Error fetching comments:', errMessage);
            setLoading(false);
        };

        const fetchURI = `${props.fetchURI}?page=${page}`;
        getRequest(fetchURI, getAccessTokenFromStorage(), successHandler, errorHandler);
    }, [page]);

    onAddCommentClick.current = (ev, content) => {

        const successHandler = (result) => {
            setComments((comments) => [...comments, result]);

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
                // loading? 
                //     <Loader width='4em' />
                // :
                //     <>
                //         {
                //             !comments.length?
                //                 <div className="no-results-container">
                //                     <div className="no-results">No Comments</div>
                //                 </div>
                //             :
                //                 comments.map(comment => (
                //                     <Comment
                //                         key={comment.id}
                //                         {...comment}
                //                         baseURI={`${props.fetchURI}/${comment.id}`}
                //                     />
                //                 ))
                //         }
                //         <CommentEditor onAddCommentClick={onAddCommentClick.current} />
                //     </>
            }

            {
                comments.map(comment => (
                    <Comment
                        key={comment.id}
                        {...comment}
                        baseURI={`${props.fetchURI}/${comment.id}`}
                    />
                ))
            }

            <div className="infinite-scroll-comment-loader">
                {
                    loading?
                        <Loader width='4em' />
                    :
                        hasMore && <div className="load-more">
                            <button onClick={loadMoreComment} >Load More</button>
                        </div>
                }
            </div>

            <CommentEditor onAddCommentClick={onAddCommentClick.current} />
        </div>
    );
}