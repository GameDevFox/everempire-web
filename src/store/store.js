/* eslint-disable */
// TODO: Remove this in prod
import { applyMiddleware, createStore, compose } from 'redux';

import tokenListener from '../auth/token-listener';

import * as actionCreators from './actions';
import promiseMiddleware from './promise-middleware';
import reducer from './reducer';

const initialState = { token: null };

const Store = (extraState = {}) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators }) || compose;
  const middleware = applyMiddleware(promiseMiddleware);

  return createStore(reducer, { ...initialState, ...extraState }, composeEnhancers(middleware));
};

// Build store and tokenListener
const store = Store();
const listener = tokenListener(store, localStorage);
store.subscribe(listener);

export default store;
