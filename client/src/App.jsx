import './App.scss';
import './utils/font-awesome';
import SubNavBar from './components/SubNavBar/SubNavBar';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <SubNavBar />
    </div>
  );
}

export default App;
