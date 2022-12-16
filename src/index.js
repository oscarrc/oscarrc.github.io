import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { RouterProvider, createHashRouter } from "react-router-dom";
import { StrictMode, lazy } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import reportWebVitals from './reportWebVitals';
import { projectsLoader } from './components/projects';
import { postsLoader } from './components/posts';

const queryClient = new QueryClient();

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
        loader: () => {
          return {
            posts: postsLoader(queryClient, 0, 3),
            projects: projectsLoader(queryClient, 0, 3)
          }
        },
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
        loader: projectsLoader(queryClient),
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
        loader: postsLoader(queryClient),
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
    <React.Suspense>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.Suspense>
  </StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
