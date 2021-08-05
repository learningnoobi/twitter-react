
import './App.css';
import { BrowserRouter,Route, Switch, NavLink, Link } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
   <BrowserRouter>
   <Switch>
   <Route path="/" exact component={Home}/>
     <Route path="/login" component={Login}/>
     <Route path="/register" component={Register}/>
   </Switch>
   </BrowserRouter>
  );
}

export default App;
