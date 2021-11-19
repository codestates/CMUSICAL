import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './components/styles/Global';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <GlobalStyles />
  </BrowserRouter>,
  document.getElementById('root')
);
