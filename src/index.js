// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/app';
import { refreshToken } from './app/rest-api';
import socket from './app/socket';
import TokenListener, { TOKEN } from './auth/token-listener';
import store from './store/store';
import { setToken, toggleDevMenu } from './store/actions';

const tokenListener = TokenListener({ store, socket, storage: localStorage });
store.subscribe(tokenListener);

const init = () => {
  // Build root component instance
  const root = (
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  );

  // Get root element
  const rootEl = document.getElementById('root');
  if(!rootEl)
    throw new Error('#root element doesn\'t exist');

  // Toggle Dev Menu
  window.onkeydown = e => {
    if(e.code === 'Backquote' && document.activeElement === document.body)
      store.dispatch(toggleDevMenu());
  };

  // Render
  render(root, rootEl);
};

const token = localStorage[TOKEN] || null;
if(token) {
  refreshToken(token)
    .then(
      newToken => store.dispatch(setToken(newToken)),
      e => {
        delete localStorage[TOKEN];
        console.warn('Invalid Token', e);
      }
    )
    .finally(init);
} else {
  init();
}
