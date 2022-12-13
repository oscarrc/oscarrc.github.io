import Projects from "../components/projects";
import { useState } from "react";

const Portfolio = () => {
    const [ page, setPage ] = useState(0);    

    return (
        <section id="projects" className="flex flex-col justify-center items-center min-h-view">
            <Projects page={ page } />
        </section>
    )
}

export default Portfolio;