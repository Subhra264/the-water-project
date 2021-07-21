import { useContext, useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { useMatchURL } from '../../../hooks/useMatch';
import { TopicContext } from '../../../utils/contexts';
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
        // TODO: Fetch the issues Api for a topic
        fetch(`/topics/${topicId}/issues/`)
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            setIssueList(result);
            setLoading(false);
        }).catch(err => {
            console.log('Error fetching issue-list', err);
        });
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
                                <Issue {...issue} />
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
                <Route path={`${matchURL}/new-issue`}>
                    <IssueEditor />
                </Route>
            </Switch>
        </div>
    );
}