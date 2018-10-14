import axios from 'axios';
import queryString from 'query-string';

import config from 'Env/config';
import store from '../store/store';

const http = axios.create({ baseURL: config.apiURL });

http.interceptors.request.use(config => {
  const { token } = store.getState();

  if(token) {
    const { headers } = config;
    headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
http.interceptors.response.use(result => result.data);

export const auth = (email, pass) => {
  if(pass)
    return http.post('/auth', { email, pass });

  const query = '?' + queryString.stringify({ devUser: email || null });
  return http.post(`/auth${query}`);
};

export const refreshToken = token => http.get('/token', { headers: { Authorization: `Bearer ${token}` } });

export const getMe = () => http.get('/me');

// DEV Endpoints
export const isDevMode = () => http.get('/dev');
export const getDevUsers = () => http.get('/dev/users');
