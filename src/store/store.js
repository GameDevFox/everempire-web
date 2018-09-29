import { applyMiddleware, createStore } from 'redux';

import tokenListener from '../auth/token-listener';

import promiseMiddleware from './promise-middleware';
import reducer from './reducer';

const initialState = { token: null };

const Store = (extraState = {}) => {
  const middleware = applyMiddleware(promiseMiddleware);
  return createStore(reducer, { ...initialState, ...extraState }, middleware);
};

// Build store and tokenListener
const store = Store();
const listener = tokenListener(store, localStorage);
store.subscribe(listener);

export default store;
