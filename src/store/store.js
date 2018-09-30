import { createStore } from 'redux';

import enhancer from 'Env/store-enhancer.js';
import tokenListener from '../auth/token-listener';

import reducer from './reducer';

const Store = () => createStore(reducer, null, enhancer);

// Build store and tokenListener
const store = Store();
const listener = tokenListener(store, localStorage);
store.subscribe(listener);

export default store;
