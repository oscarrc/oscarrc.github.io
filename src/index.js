import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { RouterProvider, createHashRouter } from "react-router-dom";
import { StrictMode, lazy } from "react";

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import reportWebVitals from './reportWebVitals';

const Error = lazy(() => import('./Error'));

const Blog = lazy(() => import('./views/Blog'));
const Landing = lazy(() => import('./views/Landing'));
const Portfolio = lazy(() => import('./views/Portfolio'));
const Post = lazy(() => import('./views/Post'));
const Project= lazy(() => import('./views/Project'));

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createHashRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {   
        id: "landing",       
        path: "/",
        element: <Landing />,
        children: [          
          {
            path: "/portfolio/:slug",
            element: <Project />
          }
        ]
      },
      {
        id: "portfolio",
        path: "/portfolio",
        element: <Portfolio />,
        loader: (data) => { return data },
        children: [          
          {
            path: "/portfolio/:slug",
            element: <Project />
          }
        ]
      },
      {
        id: "blog",
        path: "/blog",
        element: <Blog />,
        loader: (data) => { return data },
      },
      {
        id: "post",
        path: "/blog/:slug",
        element: <Post />,
        loader: (data) => { return data }
      }
    ]
  }
])


ReactGA.initialize("G-S6PKCKN17G");

root.render(
  <StrictMode> 
    <RouterProvider router={router} />
  </StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
