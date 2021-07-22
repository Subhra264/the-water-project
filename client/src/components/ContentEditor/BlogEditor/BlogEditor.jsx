import { useRef } from 'react';
import ContentEditor from '../ContentEditor';
import './BlogEditor.scss';
import categories from '../../../utils/blog-categories';
import { useHistory } from 'react-router-dom';
import { protectedRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';

export default function BlogEditor (props) {
    const selectedCategory = useRef(null);
    const onSubmitClick = useRef(null);
    const contentEditorProps = useRef(null);
    const history = useHistory();

    onSubmitClick.current = (content) => {

        const successHandler = (result) => {
            history.push(`/solutions/blogs/${result.id}`);
        };

        const errorHandler = (errMessage) => {
            console.log('Error Creating blog', errMessage);
        };

        console.log('Clicked Create Blog button!', content);

        const fetchDetails = {
            fetchURI: '/blogs/',
            method: 'POST',
            body: {
                ...content,
                type: selectedCategory.current.value
            }
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
        <ContentEditor {...contentEditorProps.current}>
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
        </ContentEditor>
    );
}