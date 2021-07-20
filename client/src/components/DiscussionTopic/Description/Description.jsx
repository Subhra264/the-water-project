// import { useContext } from 'react';
// import { TopicContext } from '../../../utils/contexts';
import './Description.scss';
import Comment from '../Comments/Comment/Comment';

/*
interface props {
    description: Object;
    baseURI: string;
    isClosed: boolean;
    setIsClosed: function;
    closeBaseURI: string;
    problemId: number;
}
*/

export default function Description (props) {
    // const { topicId } = useContext(TopicContext);

    const closeTopic = (ev) => {
        fetch(`${props.closeBaseURI}/close-topic`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.problemId
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log('Problem closed', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            props.setIsClosed(result.is_closed);
        })
        .catch(err => {
            console.log('Error closing the topic', err.message);
        });
    };

    return (
        <div className="problem-description">
            <Comment 
                isDescription
                {...props.description}
                baseURI={props.baseURI}
            />
            {
                props.isClosed?
                    <div className="problem-closed">
                        <div className="problem-closed-line"></div>
                        <div className="problem-closed-by">
                            {/* <i>@john12</i> closed this topic */}
                            This topic was closed
                        </div>
                    </div>
                :
                    <div className="close-button-container">
                        <button onClick={closeTopic}>
                            Close Topic
                        </button>
                    </div>
            }
        </div>
    );
}