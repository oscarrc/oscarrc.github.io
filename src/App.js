import Layout from "./components/layout";
import Loading from "./views/Loading";
import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import { Suspense } from "react";

const App = () => {

  return (
      <Layout>
        <Suspense fallback={<Loading />}>
          <Outlet />
          <ScrollRestoration />
        </Suspense>
      </Layout>
  );
}

export default App;
