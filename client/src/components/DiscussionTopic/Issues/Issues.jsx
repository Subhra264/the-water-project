import { Link, Switch, Route } from 'react-router-dom';
import { useMatchURL } from '../../../hooks/useMatch';
import Issue from './Issue/Issue';
import './Issues.scss';

export default function Issues (props) {
    const matchURL = useMatchURL();

    return (
        <div className='discussion-topic-issues'>
            <Switch>
                <Route path={`${matchURL}`} exact>
                    <>
                        <div className="create-issue-container">
                            <div className="create-issue"><Link to={`${matchURL}/new-issue`}>Create Issue</Link></div>
                        </div>
                        <Issue />
                        <Issue />
                        <Issue />
                        <Issue />
                        <Issue />
                    </>
                </Route>
                <Route path={`${matchURL}/new-issue`}>
                    Hello all the best stay strong stay motivated
                </Route>
            </Switch>
        </div>
    );
}