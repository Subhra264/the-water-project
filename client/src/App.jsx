import './App.scss';
import './utils/font-awesome';
import { Switch, Route } from 'react-router-dom';
import SubNavBar from './components/SubNavBar/SubNavBar';
import NavBar from './components/NavBar/NavBar';
import Discussion from './components/Discussion/Discussion';
import Solutions from './components/Solutions/Solutions';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import useViewport from './hooks/useViewport';
import { useEffect, useReducer } from 'react';
import UserReducer from './utils/reducers/User.reducer';
import { UserContext } from './utils/contexts';
import { manageUser } from './utils/actions/User.action';
import { getAccessTokenFromStorage } from './utils/manage-tokens';
import Home from './components/Home/Home';

const StickyNavBars = [
  <NavBar key='navbar' />,
  <SubNavBar key='subnavbar' />
];

function App() {
  const { isMobile } = useViewport();
  const [userState, userDispatch] = useReducer(UserReducer);

  // Check if the user is already logged in
  useEffect(() => {
    if (getAccessTokenFromStorage()) {
      userDispatch(manageUser(JSON.parse(localStorage.getItem('userState'))));
    }
  }, []);

  return (
    <UserContext.Provider value={{userState, userDispatch}}>
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
            <Home />
          </Route>
          <Route path='/sign-in' exact>
            <SignIn />
          </Route>
          <Route path='/sign-up' exact>
            <SignUp />
          </Route>
          <Route path='/problems'>
            
          </Route>
          <Route path='/solutions'>
            <Solutions />
          </Route>
          <Route path='/discussion'>
            <Discussion />
          </Route>
        </Switch>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
