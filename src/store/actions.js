import { auth } from '../app/rest-api';
import socket from '../app/socket';

// Store actions
const A = (type, extra) => ({ type, ...extra });

export const setToken = token => A('SET_TOKEN', { token });
export const logout = () => setToken(null);
export const login = (email, pass) => auth(email, pass).then(setToken, logout);

export const showDevMenu = value => A('SHOW_DEV_MENU', { value });
export const toggleDevMenu = () => A('TOGGLE_DEV_MENU');

export const sync = data => A('SYNC', { data });

// Socket Actions
export const vote = v => socket.send({ type: 'VOTE', data: { vote: v } });
