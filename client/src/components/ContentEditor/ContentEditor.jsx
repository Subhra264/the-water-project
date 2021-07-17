import { useState } from 'react';
import Editor from '../Editor/Editor';
import TagEditor from './TagEditor/TagEditor';
import './ContentEditor.scss';
import useViewport from '../../hooks/useViewport';

export default function ContetntEditor (props) {
    const [contentTitle, setContentTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const { isMobile } = useViewport();

    const onTitleChange = (ev) => {
        setContentTitle(ev.target.value);
    };

    const onContentChange = (ev, editor) => {
        setContent(editor.getData());
    };

    const addTag = (tag) => {
        setTags([...tags, tag]);
    };

    const createContent = (ev) => {
        ev.preventDefault();

        props.submit.onClick({
            title: contentTitle,
            content,
            tags
        });
    };

    return (
        <div className={`new-content-editor-container ${isMobile? 'mobile' : ''}`}>
            <div className="new-content-editor">
                <div className="new-content-title">
                    <div className="new-content-title-label">
                        Title
                    </div>
                    <div className="new-content-title-input">
                        <input type="text" value={contentTitle} onChange={onTitleChange} placeholder='Title' />
                    </div>
                </div>

                <Editor 
                    editorContent={content} 
                    onContentChange={onContentChange}
                    placeholder={props.contentEditorPlaceholder} 
                />
            </div>

            <div className="new-content-meta-data-editor">
                <div className="new-content-meta-data">
                    <TagEditor 
                        addedTags={tags} 
                        setAddedTags={setTags}
                        addTag={addTag} 
                    />
                    {/* Any more meta-data-fields will appear here */}
                    {props.children}
                </div>

                <div className="create-content" onClick={createContent}>
                    {props.submit.label}
                </div>
            </div>
        </div>
    );
}