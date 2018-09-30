import { applyMiddleware, compose } from 'redux';

import * as actionCreators from '../../store/actions';
import promiseMiddleware from '../../store/promise-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators }) || compose;
const middleware = applyMiddleware(promiseMiddleware);

export default composeEnhancers(middleware);
