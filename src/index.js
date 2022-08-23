import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import { HashRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>      
      <App />
    </HashRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
