import { applyMiddleware, createStore, compose } from 'redux';

import * as actionCreators from './actions';
import promiseMiddleware from './promise-middleware';
import reducer from './reducer';

const initialState = { message: 'world', token: null };

const Store = () => {
  /* eslint-disable */
  // TODO: Remove this in prod

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators }) || compose;
  const middleware = applyMiddleware(promiseMiddleware);

  return createStore(reducer, initialState, composeEnhancers(middleware));
  /* eslint-enable */
};

export default Store;
