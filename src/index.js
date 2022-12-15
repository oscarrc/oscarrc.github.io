import './index.css';
import { createHashRouter, RouterProvider } from "react-router-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';

import reportWebVitals from './reportWebVitals';
import { lazy } from "react";

const Blog = lazy(() => import('./views/Blog'));
const Error = lazy(() => import('./Error'));
const Landing = lazy(() => import('./views/Landing'));
const Portfolio = lazy(() => import('./views/Portfolio'));
const Post = lazy(() => import('./views/Post'));

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createHashRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {          
        path: "/",
        element: <Landing />
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
        children: [          
          {
            path: "/portfolio/:slug",
            element: <Portfolio />
          }
        ]
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/blog/:slug",
        element: <Post />
      }
    ]
  }
])

ReactGA.initialize("G-S6PKCKN17G");

root.render(
  <React.StrictMode> 
    <RouterProvider router={router} />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
