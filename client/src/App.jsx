import './App.scss';
import './utils/font-awesome';
import { Switch, Route } from 'react-router-dom';
import SubNavBar from './components/SubNavBar/SubNavBar';
import NavBar from './components/NavBar/NavBar';
// import Discussion from './components/Discussion/Discussion';
import DiscussionTopic from './components/DiscussionTopic/DiscussionTopic';
import Solutions from './components/Solutions/Solutions';
import useViewport from './hooks/useViewport';

const StickyNavBars = [
  <NavBar />,
  <SubNavBar />
];

function App() {
  const { isMobile } = useViewport();

  return (
    <div className='App'>
      {
        isMobile?
          StickyNavBars
        :
          <div className="sticky-navbars">
            {StickyNavBars}
          </div>
      }
      <Switch>
        <Route path='/' exact>

        </Route>
        <Route path='/problems'>
          
        </Route>
        <Route path='/solutions'>
          <Solutions />
        </Route>
        <Route path='/discussion'>
          {/* <Discussion /> */}
          <DiscussionTopic />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
