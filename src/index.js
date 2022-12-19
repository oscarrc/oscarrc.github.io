import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { StrictMode, lazy } from "react";
import { postLoader, postsLoader } from './components/posts';
import { projectLoader, projectsLoader } from './components/projects';

import App from './App';
import Project from "./views/Project";
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import { Suspense } from 'react';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

const Error = lazy(() => import('./Error'));

const Blog = lazy(() => import('./views/Blog'));
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
        id: "landing",
        path: "/",
        element: <Landing />,
        loader: () => {
          return {
            posts: postsLoader(queryClient, 0, 3),
            projects: projectsLoader(queryClient, 0, 3)
          }
        }
      },
      {
        id: "portfolio",
        path: "/portfolio",
        element: <Portfolio />,
        loader: () => projectsLoader(queryClient, 0, 9),
        children: [
          {
            path: "/portfolio/:slug",
            element: <Project />,
            loader: () => projectLoader(queryClient)
          }
        ]
      },
      {
        id: "blog",
        path: "/blog",
        element: <Blog />,
        loader: postsLoader(queryClient, 0, 9),
      },
      {
        id: "post",
        path: "/blog/:slug",
        element: <Post />,
        loader: postLoader(queryClient)
      }
    ]
  }
])


ReactGA.initialize("G-S6PKCKN17G");

root.render(
  <StrictMode> 
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
