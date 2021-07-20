import { useRef } from 'react';
import ContentEditor from '../ContentEditor';
import './BlogEditor.scss';
import categories from '../../../utils/blog-categories';
import { useHistory } from 'react-router-dom';

export default function BlogEditor (props) {
    const selectedCategory = useRef(null);
    const onSubmitClick = useRef(null);
    const contentEditorProps = useRef(null);
    const history = useHistory();

    onSubmitClick.current = (content) => {
        console.log('Clicked Create Blog button!', content);
        fetch('/blogs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...content,
                category: selectedCategory.current.value
            })
        }).then(res => (
            res.json()
        )).then(result => {
            console.log('Created Blog', result);

            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            history.push(`/solutions/blogs/${result.id}`);
        }).catch(err => {
            // Handle the error properly
            console.log('Error creating blog', err.message);
        });
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