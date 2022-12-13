import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import Layout from "./components/layout";
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";

const Landing = lazy(() => import('./views/Landing'));
const Portfolio = lazy(() => import('./views/Portfolio'));
const Blog = lazy(() => import('./views/Blog'));

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Suspense>
        <Routes location={ background || location }>
          <Route path="/" element={ <Landing /> } />
          <Route path="/portfolio">
            <Route index element={ <Portfolio /> } />
            <Route path=":slug" element={ <Portfolio /> } />
          </Route>
          <Route path="/blog">
            <Route index element={ <Blog /> } />
            <Route path=":slug" element={ <Blog /> } />
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
