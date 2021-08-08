
import './App.css';
import { BrowserRouter,Route, Switch} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Activate from './pages/Activate';
import Profile from './pages/Profile';

function App() {
  return (
   <BrowserRouter>
   <Switch>
   <Route path="/" exact component={Home}/>
     <Route path="/login" component={Login}/>
     <Route path="/register" component={Register}/>
     <Route path="/profile" component={Profile}/>
     <Route path="/activate/:uid/:token" component={Activate}/>
   </Switch>
   </BrowserRouter>
  );
}

export default App;
