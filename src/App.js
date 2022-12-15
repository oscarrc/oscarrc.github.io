import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";

import Layout from "./components/layout";
import Loading from "./views/Loading";
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";

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
          <Outlet />
        </Suspense>
      </Layout>
  );
}

export default App;
