import './Landing.css';

import React from 'react';

const Landing = () => {
  return (
    <div className="Landing">
      <header className="Landing-header">
        <img src="/logo.svg" className="Landing-logo" alt="logo" />
        <p>
          Edit <code>src/views/Landing.js</code> and save to reload.
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
