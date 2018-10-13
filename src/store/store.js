import { createStore } from 'redux';

import enhancer from 'Env/store-enhancer.js';
import reducer from './reducer';

const Store = () => createStore(reducer, null, enhancer);

// Build store and tokenListener
const store = Store();
export default store;
