import axios from 'axios';

import config from './config';

const http = axios.create({ baseURL: config.baseURL });
http.interceptors.response.use(result => result.data);

export const login = (email, pass) => http.post('/login', { email, pass });
