import Glitch from "../components/partials/Glitch";
import useTypewriter from "../hooks/useTypewriter";

const Loading = () => {
    const { typewritter } = useTypewriter(["..."], 100, 20);

    return (
        <section id="loader" className="flex flex-col justify-center items-center">
            <div className="hero container relative xl:mt-0 -mt-4">
                <div className="hero-content min-h-three-quarter w-full flex-col gap-16">
                    <div className="self-center flex flex-col relative text-center xl:text-left">
                        <h1 className="text-xl sm:text-3xl xl:text-4xl">
                            <Glitch delay={2500}>LOADING</Glitch>{ typewritter }
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Loading;
