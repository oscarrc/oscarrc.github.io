import Projects from "../components/projects";

const Portfolio = () => {
    return (
        <section id="projects" className="flex flex-col min-h-view gap-16">
            <h2 className="divider w-three-quarter mx-auto">WHAT I'VE BEEN DOING</h2>     
            <Projects infinite={true} />
        </section>
    )
}

export default Portfolio;