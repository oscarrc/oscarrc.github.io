import Header from "./Header";
import Social from "./Social";
import Terminal from "./Terminal";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
            <Social />
            <Terminal />
        </>
    )
}

export default Layout