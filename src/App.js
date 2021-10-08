import React, { useEffect } from "react";
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
import { load_user, recommendMeUser } from "./redux/asyncActions/UserAsync";
import { useDispatch, useSelector } from "react-redux";
import BookmarkList from "./pages/BookmarkList";
import Message from "./pages/Message";
import Notifications from "./pages/Notifications";
import { removeNotice, tweetNotice } from "./redux/slices/NotificationSlice";
import Explore from "./pages/Explore";
import ChatMessage from "./pages/ChatMessage";
import PrivateRoomChat from "./pages/PrivateRoomChat";

function App() {
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;
  const dispatch = useDispatch();
  const noticeInfo = useSelector((state) => state.notificationReducer);
  const message = noticeInfo.message;
  let endpoint = "ws://127.0.0.1:8000/ws/home/";
  const client = new W3CWebSocket(endpoint + "?token=" + userIn.access);
  message &&
    setTimeout(() => {
      dispatch(removeNotice());
    }, 3000);

  useEffect(() => {
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = function (event) {
      const data = JSON.parse(event.data);
    console.log(data);

      dispatch(tweetNotice(data.payload));
    };

    client.onclose = function () {
      console.log("WebSocket Client disconnected");
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(load_user());
    dispatch(recommendMeUser())
    !isAuthenticated && <Redirect to="/login"></Redirect>;
    
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Switch>
         <Route path="/" exact component={Home} />
        <Route path="/activate/:uid/:token" exact component={Activate} />
        <Route path="/login" component={Login} />
        <Route path="/messages/w/:username"  component={PrivateRoomChat} />
        <Route path="/messages" component={ChatMessage} />
        <Route path="/register" component={Register} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/bookmark" component={BookmarkList} />
        <Route path="/explore" component={Explore} />
        <Route path="/:username" exact component={Profile} />
        <Route path="/:username/tweet/:id" component={TweetDetail} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
