import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { pageTransition, pageVariants } from "../../config/animation";

import Footer from "./Footer";
import Header from "./Header";
import Loading from "../../views/Loading";
import ReactGA from 'react-ga';
import { motion } from "framer-motion"

const Terminal = lazy(() => import("../terminal"));

const Layout = () => {    
    const [terminal, setTerminal] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "black");
    const { pathname } = useLocation();

    const toggleTheme = (theme) => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
    }

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme])

    useEffect(() => {
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
      }, [pathname]);

    return (
        <>
            <Header toggleTheme={ toggleTheme } currentTheme={ theme } />
            <main className="flex flex-col gap-32 px-6 md:px-8 py-8">                
                <Suspense fallback={<Loading /> }>
                    <motion.div
                        key={pathname}
                        initial="initial"
                        animate="in"
                        variants={pageVariants}
                        transition={pageTransition}
                    >                    
                        <Outlet />
                        <ScrollRestoration />
                    </motion.div>
                </Suspense>
                <Suspense>
                    <Terminal isOpen={terminal} setOpen={setTerminal} toggleTheme={ toggleTheme } />
                </Suspense>
            </main>
            <Footer terminal={terminal} setTerminal={setTerminal} />
        </>
    )
}

export default Layout