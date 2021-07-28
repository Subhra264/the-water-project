import { useContext, useEffect, useState } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { useMatchURL } from '../../../hooks/useMatch';
import { TopicContext } from '../../../utils/contexts';
import { getRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';
import IssueEditor from '../../ContentEditor/IssueEditor/IssueEditor';
import Loader from '../../Loader/Loader';
import Issue from './Issue/Issue';
import './Issues.scss';

// Returns the list of all the issues
function IssueList (props) {
    const [issueList, setIssueList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { topicId } = useContext(TopicContext);
    const matchURL = useMatchURL();

    useEffect(() => {
        const successHandler = (result) => {
            setIssueList(result.results);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            console.log('Error fetching issue-list', errMessage);
        };

        // TODO: Fetch the issues Api for a topic
        getRequest(`/topics/${topicId}/issues/`, getAccessTokenFromStorage(), successHandler, errorHandler)

    }, []);

    return (
        <>
            <div className="create-issue-container">
                <div className="create-issue"><Link to={`${matchURL}/new-issue`}>Create Issue</Link></div>
            </div>
            <div className="issue-list">
                {
                    loading? 
                        <Loader width='4em' />
                    :
                        issueList.length === 0?
                            <div className="no-results-container">
                                <div className="no-results">No Issues</div>
                            </div>
                        :
                            issueList.map(issue => (
                                <Issue {...issue} key={issue.id} />
                            ))
                }
            </div>
        </>
    )
}

// Renders the components under the issues tab
export default function Issues (props) {
    const matchURL = useMatchURL();

    return (
        <div className='discussion-topic-issues'>
            <Switch>
                <Route path={`${matchURL}`} exact>
                    <IssueList />
                </Route>
                <Route path={`${matchURL}/new-issue`} exact>
                    <IssueEditor />
                </Route>
                <Route>
                    <Redirect to='/not-found' />
                </Route>
            </Switch>
        </div>
    );
}