import './App.scss';
import './utils/font-awesome';
import { Switch, Route } from 'react-router-dom';
import SubNavBar from './components/SubNavBar/SubNavBar';
import NavBar from './components/NavBar/NavBar';
import Discussion from './components/Discussion/Discussion';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <SubNavBar />
      <Switch>
        <Route path='/' exact>

        </Route>
        <Route path='/problems'>
          
        </Route>
        <Route path='/solutions'>

        </Route>
        <Route path='/discussion'>
          <Discussion />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
