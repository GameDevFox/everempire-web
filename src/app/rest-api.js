import axios from 'axios';

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

export const login = (email, pass) => http.post('/login', { email, pass });
export const refreshToken = token => http.get('/token', { headers: { Authorization: `Bearer ${token}` } });

export const me = () => http.get('/me');

// DEV Endpoints
export const getDevUsers = () => http.get('/dev/users');
