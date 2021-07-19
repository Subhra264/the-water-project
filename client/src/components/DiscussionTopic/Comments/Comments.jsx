import { useState, useEffect } from 'react';
import Comment from './Comment/Comment';
import CommentEditor from '../../ContentEditor/CommentEditor/CommentEditor';
import Loader from '../../Loader/Loader';
import './Comments.scss';

export default function Comments (props) {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    
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

    return (
        <div className='comments'>
            {
                loading? 
                    <Loader />
                :
                    <>
                        {
                            comments.length === 0?
                                <div className="no-results-container">
                                    <div className="no-results">No Comments</div>
                                </div>
                            :
                                comments.map(comment => (
                                    <Comment key={comment.id} {...comment} />
                                ))
                        }
                        <CommentEditor />
                    </>
            }
        </div>
    );
}