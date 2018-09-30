import { createStore } from 'redux';

import enhancer from 'Env/store-enhancer.js';
import tokenListener from '../auth/token-listener';

import reducer from './reducer';

const initialState = { token: null };

const Store = (extraState = {}) => createStore(reducer, { ...initialState, ...extraState }, enhancer);

// Build store and tokenListener
const store = Store();
const listener = tokenListener(store, localStorage);
store.subscribe(listener);

export default store;
