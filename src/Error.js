import Glitch from "./components/partials/Glitch";
import Keyboard from "./components/partials/Keyboard";
import Layout from "./components/layout";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import useTypewriter from "./hooks/useTypewriter";

const Error = () => {
    const error = useRouteError();
    const { direction, text, typewritter } = useTypewriter([`Error ${error.status || 500}: ${error.statusText || "Internal server error"}`], 100, 20);
    console.log(error)   

    return (
        <Layout>
            <section id="error" className="flex flex-col justify-center items-center min-h-view">
                <div className="hero container relative xl:mt-0 -mt-4">
                    <div className="hero-content min-h-three-quarter w-full flex-col xl:flex-row xl:justify-between gap-16">
                        <div className="self-center xl:self-start text-center xl:text-left">
                            <div className="flex flex-col relative">
                                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold"><span className="text-outline">Ooops! It seems like there was an</span> <Glitch delay={5000}>Error</Glitch></h1>
                                <h2 className="text-xl sm:text-3xl xl:text-4xl py-6">{ typewritter }</h2>                            
                            </div>
                            <Link to="/">
                                <span className="btn btn-secondary mx-auto mt-8">Go to the main page</span>
                            </Link>
                        </div>
                        <div className="xl:absolute xl:right-32 xl:top-[50%]">            
                            <Keyboard isDeleting={ direction === 'backwards'} pressed={ text.length ? text.at(-1) : ''} speed={100} />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Error;
