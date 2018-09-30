import { applyMiddleware } from 'redux';
import promiseMiddleware from '../../store/promise-middleware';

const middleware = applyMiddleware(promiseMiddleware);

export default middleware;
