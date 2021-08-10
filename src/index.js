import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Comment.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './redux/store';

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${localStorage.getItem("access")}`,
    Accept: "application/json",
  }
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
