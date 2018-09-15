import * as api from '../app/rest-api';

const A = (type, extra) => ({ type, ...extra });

export const logout = () => A('SET_TOKEN', { token: null });
export const login = (email, pass) => api.login(email, pass).then(
  token => A('SET_TOKEN', { token }),
  logout
);

export const showDevMenu = value => A('SHOW_DEV_MENU', { value });
export const toggleDevMenu = () => A('TOGGLE_DEV_MENU');
