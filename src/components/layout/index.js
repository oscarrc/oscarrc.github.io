import { Suspense, lazy, useEffect, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";

const Terminal = lazy(() => import("../terminal"));

const Layout = ({ children }) => {    
    const [terminal, setTerminal] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "black");

    const toggleTheme = (theme) => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
    }

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme])

    return (
        <>
            <Header toggleTheme={ toggleTheme } currentTheme={ theme } />
            <main className="px-6 md:px-8">
                { children }
                <Suspense>
                    <Terminal isOpen={terminal} />
                </Suspense>
            </main>
            <Footer terminal={terminal} setTerminal={setTerminal} />
        </>
    )
}

export default Layout