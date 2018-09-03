import { applyMiddleware, createStore } from 'redux';

import promiseMiddleware from './promise-middleware';
import reducer from './reducer';

const initialState = { message: 'world', token: null };

const Store = (extraState = {}) => {
  const middleware = applyMiddleware(promiseMiddleware);
  return createStore(reducer, { ...initialState, ...extraState }, middleware);
};

export default Store;
