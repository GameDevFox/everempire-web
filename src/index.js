// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/app';
import tokenStorage, { TOKEN } from './auth/token-storage';
import Store from './store/store';
import { toggleDevMenu } from './store/actions';

const token = localStorage[TOKEN] || null;

const store = Store({ token });
store.subscribe(tokenStorage(store, localStorage));

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

// Toggle Dev Menu
window.onkeydown = e => {
  if(e.code === 'Backquote' && document.activeElement === document.body)
    store.dispatch(toggleDevMenu());
};

render(root, rootEl);
