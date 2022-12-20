import { Suspense, lazy, useEffect, useState } from "react";
import { pageTransition, pageVariants } from "../../config/animation";

import Footer from "./Footer";
import Header from "./Header";
import ReactGA from 'react-ga';
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom";

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
            <main className="flex flex-col gap-32 px-6 md:px-8 py-8">                
                <motion.div
                    key={pathname}
                    initial="initial"
                    animate="in"
                    variants={pageVariants}
                    transition={pageTransition}
                >                    
                    { children }
                </motion.div>
                <Suspense>
                    <Terminal isOpen={terminal} setOpen={setTerminal} toggleTheme={ toggleTheme } />
                </Suspense>
            </main>
            <Footer terminal={terminal} setTerminal={setTerminal} />
        </>
    )
}

export default Layout