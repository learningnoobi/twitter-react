import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Component.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './redux/store';
const baseURL= 'http://127.0.0.1:8000/';
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  }, 
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = 'JWT ' +localStorage.getItem('access');
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),

// async function (error) {
//   const originalRequest = error.config;

//   if (
//     error.response.status === 401 &&
//     originalRequest.url === baseURL + 'token/refresh/'
//   ) {
//     window.location.href = '/login/';
//     return Promise.reject(error);
//   }

//   if (
//     error.response.data.code === 'token_not_valid' &&
//     error.response.status === 401 &&
//     error.response.statusText === 'Unauthorized'
//   ) {
//     const refreshToken = localStorage.getItem('refresh');

//     if (refreshToken) {
//       const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

//       // exp date in token is expressed in seconds, while now() returns milliseconds:
//       const now = Math.ceil(Date.now() / 1000);
//       console.log(tokenParts.exp);

//       if (tokenParts.exp > now) {
//         return axiosInstance
//           .post('/token/refresh/', { refresh: refreshToken })
//           .then((response) => {
//             localStorage.setItem('access', response.data.access);
//             localStorage.setItem('refresh', response.data.refresh);

//             axiosInstance.defaults.headers['Authorization'] =
//               'JWT ' + response.data.access;
//             originalRequest.headers['Authorization'] =
//               'JWT ' + response.data.access;

//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       } else {
//         console.log('Refresh token is expired', tokenParts.exp, now);
//         window.location.href = '/login/';
//       }
//     } else {
//       console.log('Refresh token not available.');
//       window.location.href = '/login/';
//     }
//   }

//   // specific error handling done elsewhere
//   return Promise.reject(error);
// }
);

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
