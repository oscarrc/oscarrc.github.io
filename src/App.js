import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "./components/layout";

const Landing = lazy(() => import('./views/Landing'));
const Projects = lazy(() => import('./views/projects'));
const Blog = lazy(() => import('./views/blog'));

function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
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
