import { useRef, useState } from 'react';
import ContentEditor from '../ContentEditor';
import './BlogEditor.scss';
import categories from '../../../utils/blog-categories';
import { useHistory } from 'react-router-dom';
import { protectedRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';
import ImgSelector from '../ImgSelector/ImgSelector';

export default function BlogEditor (props) {
    const [error, setError] = useState('');
    const selectedCategory = useRef(null);
    const onSubmitClick = useRef(null);
    const contentEditorProps = useRef(null);
    const inputFileRef = useRef(null);
    const history = useHistory();

    onSubmitClick.current = (content) => {

        if (!content.title || !content.content) {
            setError('Please fill all the required fields!');
            return;
        }

        const successHandler = (result) => {
            history.push(`/solutions/blogs/${result.id}`);
        };

        const errorHandler = (errMessage) => {
            console.log('Error Creating blog', errMessage);
        };

        console.log('Clicked Create Blog button!', content);

        let formData = new FormData();
        if (inputFileRef.current.files.length) {
            console.log('Input Files', inputFileRef.current.files);
            const file = inputFileRef.current.files[0];
            formData.append('front_img', file);
        }

        formData.append('title', content.title);
        formData.append('content', content.content);
        formData.append('tags', content.tags);
        formData.append('type', selectedCategory.current.value);
        console.log('Form data blogs editor', formData);

        const fetchDetails = {
            fetchURI: '/blogs/',
            method: 'POST',
            isFormData: true,
            body: formData
        };

        // POST request to create the blog
        protectedRequest(fetchDetails, getAccessTokenFromStorage(), successHandler, errorHandler);
    };

    contentEditorProps.current = {
        submit: {
            label: 'Create Blog',
            onClick: onSubmitClick.current
        },
        contentEditorPlaceholder: 'Share your ideas, solutions and success stories...'
    };

    return (
        <ContentEditor {...contentEditorProps.current} error={error}>
            <div className="blog-category">
                <div className="blog-category-label">
                    Select Category
                </div>
                <div className="blog-category-select">
                    <select name='category' id='category' ref={selectedCategory} required>
                        {
                            categories.map(category => (
                                <option key={category[0]} value={category[0]}>{category[1]}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <ImgSelector inputFileRef={inputFileRef} title='Choose an image for the thumbnail'/>
        </ContentEditor>
    );
}