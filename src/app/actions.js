import * as api from './everempire-api';

import store from './store';

const A = (type, extra) => {
  const action = { type, ...extra };
  return store.dispatch(action);
};

export const login = (email, pass) => api.login(email, pass).then(
  token => A('SET_TOKEN', { token }),
  () => A('SET_TOKEN', { token: null })
);
