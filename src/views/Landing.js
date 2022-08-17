import './Landing.css';

import React from 'react';
import logo from './logo.svg';

const Landing = () => {
  return (
    <div className="Landing">
      <header className="Landing-header">
        <img src={logo} className="Landing-logo" alt="logo" />
        <p>
          Edit <code>src/Landing.js</code> and save to reload.
        </p>
        <a
          className="Landing-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Landing;
