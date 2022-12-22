import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createHashRouter, defer } from "react-router-dom";
import { Suspense, lazy } from "react";
import { postLoader, postsLoader } from './components/posts';
import { projectLoader, projectsLoader } from './components/projects';

import Layout from "./components/layout";
import { aboutLoader } from './components/landing';

const queryClient = new QueryClient();

const Error = lazy(() => import('./Error'));

const Blog = lazy(() => import('./views/Blog'));
const Landing = lazy(() => import('./views/Landing'));
const Portfolio = lazy(() => import('./views/Portfolio'));
const Post = lazy(() => import('./views/Post'));
const Project = lazy(() => import('./views/Project'));


const App = () => {

  const router = createHashRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {   
          id: "landing",
          path: "/",
          element: <Landing />,
          loader: async () => ({
            posts: await postsLoader(queryClient, 0, 3),
            projects: await projectsLoader(queryClient, 0, 3),
            about: await aboutLoader(queryClient)
          })
        },
        {
          id: "portfolio",
          path: "/portfolio",
          element: <Portfolio />,
          loader: projectsLoader(queryClient, 0, 9),
          children: [
            {
              path: "/portfolio/:slug",
              element: <Project />,
              loader: projectLoader(queryClient)
            }
          ]
        },
        {
          id: "blog",
          path: "/blog",
          element: <Blog />,
          loader: postsLoader(queryClient, 0, 9)
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

  return (
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
  );
}

export default App;
