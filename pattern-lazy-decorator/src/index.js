const start = window.performance.now();

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';

ReactDOM.render(<App />, document.getElementById('root'));

const end = window.performance.now();
console.log('Launch time : ' + (end - start));
