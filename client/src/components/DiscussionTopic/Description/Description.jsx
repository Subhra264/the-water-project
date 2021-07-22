import { useContext } from 'react';
import { TopicContext } from '../../../utils/contexts';
import './Description.scss';
import Comment from '../Comments/Comment/Comment';
import { protectedRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';

/*
interface props {
    description: Object;
    baseURI: string;
    isClosed: boolean;
    setIsClosed: function;
    closeBaseURI: string;
    problemId: number;
    problemType: string;
}
*/

export default function Description (props) {
    const { administratorAccess } = useContext(TopicContext);

    const closeTopic = (ev) => {

        const successHandler = (result) => {
            props.setIsClosed(result.is_closed);
        };

        const errorHandler = (errMessage) => {
            console.log('Error closing the topic', errMessage);
        };

        const fetchDetails = {
            fetchURI: `${props.closeBaseURI}/`,
            method: 'PATCH',
            body: {
                id: props.problemId
            }
        };

        protectedRequest(fetchDetails, getAccessTokenFromStorage(), successHandler, errorHandler);
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
                            This was closed
                        </div>
                    </div>
                :
                    <>
                        {
                            administratorAccess?
                                <div className="close-button-container">
                                    <button onClick={closeTopic}>
                                        Close {props.problemType}
                                    </button>
                                </div>
                            :
                                ''
                        }
                    </>
            }
        </div>
    );
}