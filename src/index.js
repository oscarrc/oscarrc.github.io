import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import { StrictMode } from "react";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode> 
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register();
ReactGA.initialize("G-S6PKCKN17G");
reportWebVitals();
