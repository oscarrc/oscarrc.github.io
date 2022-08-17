import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import { lazy } from "react";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={() => lazy(import('./components/layout'))} />
      </Routes>
    </Layout>
  );
}

export default App;
