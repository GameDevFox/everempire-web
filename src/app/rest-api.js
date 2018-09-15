import axios from 'axios';

import store from '../store/store';
import config from './config';

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
export const me = () => http.get('/me');

export const verify = token => http.get('/me', { headers: { Authorization: `Bearer ${token}` } });
