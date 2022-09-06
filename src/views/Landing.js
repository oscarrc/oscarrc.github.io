import Keyboard from "../components/partials/Keyboard";
import Me from "../components/partials/Me";
import PostCard from "../components/blog/PostCard";
import ProjectCard from "../components/projects/ProjectCard";
import useTypewriter from "../hooks/useTypewriter";

const Landing = () => {
  const { direction, text, typewritter } = useTypewriter(["And I do web development", "Keep scrolling to know more"], 100, 20);

  return (
    <>
      <section id="home" className="flex flex-col justify-center items-center min-h-view">
        <div className="hero container relative xl:mt-0 -mt-4">
          <div className="hero-content min-h-three-quarter w-full flex-col xl:flex-row xl:justify-between gap-16">
            <div className="self-center xl:self-start flex flex-col relative text-center xl:text-left">
              <h1 className="text-4xl sm:text-6xl xl:text-9xl font-bold"><span className="text-outline">Hi! My name <br/> is</span> Oscar</h1>
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
            <Me className="lg:max-w-quarter" fill="fill-secondary" />
            <div className="flex flex-col relative gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold py-2">So you want to know more about me, uh?</h2>
              <p>Well, I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!</p>
              <p>Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.</p>
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
        <button className="btn btn-secondary w-three-quarter mx-auto my-1 md:mt-16">Grab my resume</button>
      </section>

      <span className="divider w-three-quarter mx-auto">OR</span>

      <section id="projects" className="flex flex-col justify-center items-center min-h-half">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold text-center pb-4">Check what I've doing lately</h2>
          <div className="w-three-quarter mx-auto grid grid-cols grid-cols-2 items-center justify-center gap-4">
            <ProjectCard />
          </div>
        </div>
      </section>
      
      <section id="blog" className="flex flex-col justify-center items-center min-h-half py-4">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold text-center pb-4">Read the latest from my blog</h2>
          <div className="grid grid-cols grid-cols-2 w-three-quarter gap-4 md:gap-8 p-8 mx-auto">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </section>   
    </>
  );
}

export default Landing;
