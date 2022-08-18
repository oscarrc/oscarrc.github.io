import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "./components/layout";

const Landing = lazy(() => import('./views/Landing'));

function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path="/" element={ <Landing /> } />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
