import axios from 'axios/index';

const configP = axios.get('./config.json').then(resp => resp.data);
export default configP;
