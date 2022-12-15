import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import Layout from "./components/layout";
import Loading from "./views/Loading";
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";

const Blog = lazy(() => import('./views/Blog'));
const Error = lazy(() => import('./views/Error'));
const Landing = lazy(() => import('./views/Landing'));
const Portfolio = lazy(() => import('./views/Portfolio'));
const Post = lazy(() => import('./views/Post'));

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const post = location.state && location.state.post;

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes location={ background || location }>
          <Route path="/" element={ <Landing /> } />
          <Route path="/portfolio">
            <Route index element={ <Portfolio /> } />
            <Route path=":slug" element={ <Portfolio /> } />
          </Route>
          <Route path="/blog">
            <Route index element={ <Blog /> } />
            <Route path=":slug" element={ <Post post={ post } /> } />
          </Route>
          <Route path="*" element={ <Error status={ location?.state?.error || 404 } message={ location?.state?.message || "Page not found" } /> } />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
