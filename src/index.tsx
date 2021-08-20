import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/app/app';

var mountNode = document.getElementById("app");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  mountNode
);
