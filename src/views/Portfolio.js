import Projects from "../components/projects";

const Portfolio = () => {
    return (
        <section id="projects" className="flex flex-col justify-center items-center min-h-view">     
            <Projects infinite={true} />
        </section>
    )
}

export default Portfolio;