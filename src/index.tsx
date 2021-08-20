import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './app/store'
import App from './app/app';

var mountNode = document.getElementById("app");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  mountNode
);
