import Glitch from "../components/partials/Glitch";
import Keyboard from "../components/partials/Keyboard";
import Me from "../components/partials/Me";
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
            <div className="flex flex-col relative gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold py-2">So you want to know more about me, uh?</h2>
              <p>Well, I enjoy creating things that live on the internet, but I also enjoy solving my own problems with programming. This interest started back in 2012 when I started a Wordpress blog to earn some pasive income through adSense for which I coded my own theme.</p>
              <p>Fast-forward to today, and I’ve had the privilege of working at an elearning company, a crypto start-up, a legal corporation, and as a freelancer. My main focus these days is building accessible, and usable products to try and make people life easier.</p>
              <p>Here are a few technologies I’ve been working with recently:</p>
              <ul className="ml-8 grid grid-cols-2 overflow-hidden">
                <li>&gt; JavaScript (ES6+)</li>
                <li>&gt; Node.js</li>
                <li>&gt; React</li>
                <li>&gt; Next.js</li>
                <li>&gt; Solidity</li>
                <li>&gt; Web3.js</li>
              </ul>
            </div>
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
