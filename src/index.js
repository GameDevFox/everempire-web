import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app';

console.log('Hello EverEmpire.com');

const root = (
  <Router>
    <App/>
  </Router>
);

render(root, document.getElementById('root'));
