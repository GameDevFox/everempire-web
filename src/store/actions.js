import * as api from '../app/rest-api';

const A = (type, extra) => ({ type, ...extra });

export const setToken = token => A('SET_TOKEN', { token });
export const logout = () => setToken(null);
export const login = (email, pass) => api.login(email, pass).then(
  setToken,
  logout
);

export const showDevMenu = value => A('SHOW_DEV_MENU', { value });
export const toggleDevMenu = () => A('TOGGLE_DEV_MENU');
