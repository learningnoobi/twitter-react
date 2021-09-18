import React,{useEffect} from 'react'

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Activate from "./pages/Activate";
import Profile from "./pages/Profile";
import TweetDetail from "./pages/TweetDetail";
import NotFound from "./components/NotFound";
import { load_user } from './redux/asyncActions/UserAsync';
import { useDispatch } from 'react-redux';
import BookmarkList from './pages/BookmarkList';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(load_user())
    console.log('loaded user')
    
    // !isAuthenticated && history.push("/login");
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/activate/:uid/:token" exact component={Activate} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/bookmark" component={BookmarkList} />
        <Route path="/:username" exact component={Profile} />
        <Route path="/:username/tweet/:id" component={TweetDetail} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
