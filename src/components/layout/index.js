import { AnimatePresence, motion } from "framer-motion"
import { ScrollRestoration, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { pageTransition, pageVariants } from "../../config/animation";

import AnimatedOutlet from "./AnimatedOutlet"
import Footer from "./Footer";
import Header from "./Header";
import Loading from "../../views/Loading";
import ReactGA from 'react-ga';

const Terminal = lazy(() => import("../terminal"));

const Layout = ({ children }) => {    
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
            <AnimatePresence mode="wait">
                <motion.main 
                    className="flex flex-col gap-32 px-6 md:px-8 my-16"                
                    key={pathname}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                
                >                
                    <Suspense fallback={<Loading /> }>                
                        { children || <AnimatedOutlet /> }
                        <ScrollRestoration />
                    </Suspense>
                    <Suspense>
                        <Terminal isOpen={terminal} setOpen={setTerminal} toggleTheme={ toggleTheme } />
                    </Suspense>
                </motion.main>
            </AnimatePresence>
            <Footer terminal={terminal} setTerminal={setTerminal} />
        </>
    )
}

export default Layout