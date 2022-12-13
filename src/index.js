import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import { HashRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

ReactGA.initialize("G-S6PKCKN17G");

root.render(
  <React.StrictMode>
    <HashRouter>      
      <App />
    </HashRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
