import About from "../components/landing";
import Glitch from "../components/partials/Glitch";
import Keyboard from "../components/partials/Keyboard";
import Me from "../components/landing/Me";
import Posts from "../components/posts";
import Projects from "../components/projects";
import useTypewriter from "../hooks/useTypewriter";

const Landing = () => {
  const { direction, text, typewritter } = useTypewriter(["And I do web development", "Keep scrolling to know more"], 100, 20);
  
  return (
    <>
      <section id="home" className="flex flex-col justify-center items-center min-h-view">
        <div className="hero container relative xl:mt-0 -mt-4">
          <div className="hero-content min-h-three-quarter w-full flex-col xl:flex-row xl:justify-between gap-16">
            <div className="self-center xl:self-start flex flex-col relative text-center xl:text-left">
              <h1 className="text-4xl sm:text-6xl xl:text-9xl font-bold"><span className="text-outline">Hi! My name <br/> is</span> <Glitch delay={5000}>Oscar</Glitch></h1>
              <h2 className="text-xl sm:text-3xl xl:text-4xl py-6">{ typewritter }</h2>
            </div>
            <div className="xl:absolute xl:right-32 xl:top-[50%]">            
              <Keyboard isDeleting={ direction === 'backwards'} pressed={ text.length ? text.at(-1) : ''} speed={100} />
            </div>
          </div>
        </div>
      </section>
      
      <section id="about" className="flex flex-col justify-start items-center">
        <div className="container">
          <div className="flex w-three-quarter mx-auto flex-col-reverse lg:items-end lg:flex-row lg:justify-between gap-16 lg:gap-32">
            <Me className="lg:max-w-quarter hidden lg:block" fill="fill-secondary" />
            <About />
          </div>
        </div>
        <button className="btn btn-secondary w-three-quarter mx-auto mt-8">Grab my resume</button>
      </section>
      
      <section id="projects" className="flex flex-col justify-center items-center min-h-half">
        <div className="container">
          <h2 className="divider w-three-quarter mx-auto mb-32">WHAT I'VE BEEN DOING</h2>
          <Projects limit={3} />
        </div>
      </section>
      
      <section id="blog" className="flex flex-col justify-center items-center min-h-half py-4  mb-16">
        <div className="container">          
          <h2 className="divider w-three-quarter mx-auto mb-32">WHAT I'VE WRITING ABOUT</h2>
          <Posts limit={3} />
        </div>
      </section>
    </>
  );
}

export default Landing;
