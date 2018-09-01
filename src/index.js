// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/app';
import store from './app/store';

console.log('Hello EverEmpire.com');

const root = (
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);

const rootEl = document.getElementById('root');
if(!rootEl)
  throw new Error('#root element doesn\'t exist');

render(root, rootEl);
