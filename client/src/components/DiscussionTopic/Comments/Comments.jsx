import { useState, useEffect, useRef } from 'react';
import Comment from './Comment/Comment';
import CommentEditor from '../../ContentEditor/CommentEditor/CommentEditor';
import Loader from '../../Loader/Loader';
import './Comments.scss';

export default function Comments (props) {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const onAddCommentClick = useRef(null);
    
    useEffect(() => {
        // Fetch the API
        fetch(props.fetchURI)
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            setComments(result);
            setLoading(false);
        }).catch(err => {
            console.log('Error fetching comments:', err);
        });

    }, []);

    onAddCommentClick.current = (ev, content) => {
        // POST request to add the comment
        fetch(`${props.fetchURI}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content
            })
        }).then(res => res.json())
        .then(result => {
            console.log('Added Comment', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            setComments([...comments, result]);

            ev.target.disabled = false;
            ev.target.innerText = 'Comment';
        }).catch(err => {
            console.log('Error adding comment', err.message);
        });
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
                                        baseURI={`${props.fetchURI}/comments/${comment.id}`}
                                    />
                                ))
                        }
                        <CommentEditor onAddCommentClick={onAddCommentClick.current} />
                    </>
            }
        </div>
    );
}