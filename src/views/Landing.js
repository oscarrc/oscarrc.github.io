import Keyboard from "../components/partials/Keyboard";
import useTypewriter from "../hooks/useTypewriter";

const Landing = () => {
  const { text } = useTypewriter(["And I do web development", "Keep scrolling to know more"], 100, 20);

  return (
    <section className="flex flex-col justify-center items-center min-h-view">
      <div className="hero container relative">
        <div className="hero-content min-h-3/4 w-full flex-col xl:flex-row xl:justify-between gap-16">
          <div className="self-center xl:self-start flex flex-col relative text-center xl:text-left">
            <h1 className="text-6xl xl:text-9xl font-bold">Hi! My name is Oscar</h1>
            <h3 className="text-3xl xl:text-4xl py-6">{ text }</h3>
          </div>
          <div className="xl:absolute xl:right-0 xl:top-[50%]">            
            <Keyboard pressed={ text.length ? text.slice(0,-1) : ''}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
