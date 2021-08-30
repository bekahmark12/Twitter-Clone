import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import Routes from './Routes/index'


ReactDOM.render(
  <React.Fragment>
    <Routes/>
  </React.Fragment>,
  document.getElementById('root')
);
