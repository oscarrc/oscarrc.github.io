import { ScrollRestoration, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";

import Layout from "./components/layout";
import Loading from "./views/Loading";
import { Outlet } from "react-router-dom";
import ReactGA from 'react-ga';

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }, [pathname]);

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
