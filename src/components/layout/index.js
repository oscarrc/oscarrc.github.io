import { Suspense, lazy, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";

const Terminal = lazy(() => import("../terminal"));

const Layout = ({ children }) => {    
    const [terminal, setTerminal] = useState(false);

    return (
        <>
            <Header />
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