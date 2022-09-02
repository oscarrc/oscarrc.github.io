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
          <Route path="/projects" element={ <Projects /> } />
          <Route path="/blog" element={ <Blog /> } />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
