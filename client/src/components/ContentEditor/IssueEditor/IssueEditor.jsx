import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { TopicContext, UserContext } from '../../../utils/contexts';
import { protectedRequest } from '../../../utils/fetch-request';
import ContentEditor from '../ContentEditor';

export default function IssueEditor (props) {
    const { topicId } = useContext(TopicContext);
    const history = useHistory();
    const contentEditorProps = useRef(null);
    const onSubmitClick = useRef(null);
    const { userState } = useContext(UserContext);

    onSubmitClick.current = (issue) => {
        console.log('Clicked Create Issue button!', issue);

        const successHandler = (result) => {
            history.push(`/discussion/topics/${topicId}/issues`);
        };

        const errorHandler = (errMessage) => {
            console.log('Error creating issue', errMessage);
        };
        
        // Make the request to create an issue
        const fetchDetails = {
            fetchURI: `/topics/${topicId}/issues/`,
            method: 'POST',
            body: {
                title: issue.title,
                description: issue.content,
                tags: issue.tags
            }
        };

        protectedRequest(fetchDetails, userState.access, successHandler, errorHandler);
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