import { useContext, useState } from 'react';
import useViewport from '../../../hooks/useViewport';
import { UserContext } from '../../../utils/contexts';
import Editor from '../../Editor/Editor';
import './CommentEditor.scss';

export default function CommentEditor (props) {
    const [comment, setComment] = useState('');
    const { isMobile } = useViewport();
    const { userState } = useContext(UserContext);

    const onCommentChange = (ev, editor) => {
        setComment(editor.getData());
    };

    const addComment = (ev) => {
        ev.preventDefault();
        ev.target.innerText = 'Commenting';
        ev.target.disabled = true;

        setComment('');
        props.onAddCommentClick(ev, comment);
    };

    return (
        <>
            {
                userState? 
                    <div className={`comment-editor ${isMobile? 'mobile' : ''}`}>
                        <Editor 
                            editorContent={comment}
                            onContentChange={onCommentChange}
                            placeholder='Write your comment...'
                        />
                        <div className="comment-editor-add-comment">
                            <button className="add-comment" onClick={addComment}>Comment</button>
                        </div>
                    </div>
                :
                    ''
            }
        </>
    );
}