import { useRef } from 'react';
import ContentEditor from '../ContentEditor';
import './BlogEditor.scss';
import categories from '../../../utils/blog-categories';

export default function BlogEditor (props) {
    const selectedCategory = useRef(null);

    const onSubmitClick = (content) => {
        console.log('Clicked Create Blog button!', content);
        // fetch('api', {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         ...content,
        //         category: selectedCategory.current.value
        //     })
        // }).then(res => (
        //     res.json()
        // )).then(result => {

        // }).catch(err => {
        //     // Handle the error properly
        // });
    };

    const contentEditorProps = {
        submit: {
            label: 'Create Blog',
            onClick: onSubmitClick
        },
        contentEditorPlaceholder: 'Share your ideas, solutions and success stories...'
    };

    return (
        <ContentEditor {...contentEditorProps}>
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