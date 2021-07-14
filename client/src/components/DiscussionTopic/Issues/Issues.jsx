import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import Issue from "./Issue/Issue";
import './Issues.scss';

export default function Issues (props) {
    const match = useRouteMatch();

    return (
        <div className='discussion-topic-issues'>
            <Switch>
                <Route path={`${match.url}`} exact>
                    <>
                        <div className="create-issue-container">
                            <div className="create-issue"><Link to={`${match.url}/new-issue`}>Create Issue</Link></div>
                        </div>
                        <Issue />
                        <Issue />
                        <Issue />
                        <Issue />
                        <Issue />
                    </>
                </Route>
                <Route path={`${match.url}/new-issue`}>

                </Route>
            </Switch>
        </div>
    );
}