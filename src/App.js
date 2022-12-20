import { ScrollRestoration, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { pageTransition, pageVariants } from "./config/animation";

import Layout from "./components/layout";
import Loading from "./views/Loading";
import { Outlet } from "react-router-dom";
import ReactGA from 'react-ga';
import { motion } from "framer-motion"

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }, [pathname]);

  return (
      <Layout>
        <Suspense fallback={<Loading />}>
          <motion.div
             key={pathname}
             initial="initial"
             animate="in"
             variants={pageVariants}
             transition={pageTransition}
          >
            <Outlet />
          </motion.div>
          <ScrollRestoration />
        </Suspense>
      </Layout>
  );
}

export default App;
