import useTypewriter from "../hooks/useTypewriter";

const Landing = () => {
  const { text } = useTypewriter(["And I do web development"], 100, 20);

  return (
    <section className="flex flex-col justify-center items-center min-h-view">
      <div className="hero container">
        <div className="hero-content min-h-3/4 w-full flex-col lg:flex-row justify-between">
          <div className="self-center lg:self-start flex flex-col flex-1 relative text-center lg:text-left">
            <h1 className="text-6xl lg:text-9xl font-bold">Hi! My name is Oscar</h1>
            <h3 className="text-3xl lg:text-4xl py-6">{ text }</h3>
          </div>
          <img src="https://placeimg.com/260/400/arch" className="self-center lg:self-end max-w-sm rounded-lg shadow-2xl" alt="Oscar R.C. web developer" />
        </div>
      </div>
    </section>
  );
}

export default Landing;
