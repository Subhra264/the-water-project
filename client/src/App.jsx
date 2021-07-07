import './App.scss';
import './utils/font-awesome';
import { Switch, Route } from 'react-router-dom';
import SubNavBar from './components/SubNavBar/SubNavBar';
import NavBar from './components/NavBar/NavBar';
import Discussion from './components/Discussion/Discussion';
// import DiscussionTopic from './components/DiscussionTopic/DiscussionTopic';
import Solutions from './components/Solutions/Solutions';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
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
        <Route path='/sign-in'>
          <SignIn />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
        <Route path='/problems'>
          
        </Route>
        <Route path='/solutions'>
          <Solutions />
        </Route>
        <Route path='/discussion'>
          <Discussion />
          {/* <DiscussionTopic /> */}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
