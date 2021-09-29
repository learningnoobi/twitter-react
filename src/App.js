import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Activate from "./pages/Activate";
import Profile from "./pages/Profile";
import TweetDetail from "./pages/TweetDetail";
import NotFound from "./components/NotFound";
import { load_user } from "./redux/asyncActions/UserAsync";
import { useDispatch, useSelector } from "react-redux";
import BookmarkList from "./pages/BookmarkList";
import Notifications from "./pages/Notifications";

function App() {
 
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  // const client = new W3CWebSocket("ws://127.0.0.1:8000/ws/home/");

  useEffect(() => {
    dispatch(load_user());
    // console.log('loaded user')
    !isAuthenticated && <Redirect to="/login"></Redirect>;
 
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
  
 
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/activate/:uid/:token" exact component={Activate} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/bookmark" component={BookmarkList} />
        <Route path="/:username" exact component={Profile} />
        <Route path="/:username/tweet/:id" component={TweetDetail} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
