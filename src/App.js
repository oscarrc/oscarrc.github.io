import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "./components/layout";
import { useLocation } from "react-router-dom";

const Landing = lazy(() => import('./views/Landing'));
const Projects = lazy(() => import('./views/projects'));
const Blog = lazy(() => import('./views/blog'));

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <Layout>
      <Suspense>
        <Routes location={ background || location }>
          <Route path="/" element={ <Landing /> } />
          <Route path="/projects">
            <Route index element={ <Projects /> } />
            <Route path=":slug" element={ <Projects /> } />
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
