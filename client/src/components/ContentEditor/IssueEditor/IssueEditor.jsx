import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { TopicContext } from '../../../utils/contexts';
import ContentEditor from '../ContentEditor';

export default function IssueEditor (props) {
    const { topicId } = useContext(TopicContext);
    const history = useHistory();
    const contentEditorProps = useRef(null);
    const onSubmitClick = useRef(null);
    
    onSubmitClick.current = (issue) => {
        console.log('Clicked Create Issue button!', issue);

        // TODO: Make the request to create an issue
        fetch(`/topics/${topicId}/issues/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: issue.title,
                description: issue.content,
                tags: issue.tags
            })
        }).then(res => (
            res.json()
        )).then(result => {
            console.log('Created issue', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
            history.push(`/discussion/topics/${topicId}/issues`);
        }).catch(err => {
            //Properly handle the error
            console.log('Error creating issue', err.message);
        });
    };

    contentEditorProps.current = {
        submit: {
            label: 'Create Issue',
            onClick: onSubmitClick.current
        },
        contentEditorPlaceholder: 'Describe the issue'
    };

    return (
        <ContentEditor {...contentEditorProps.current} />
    );
}