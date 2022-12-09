import { useEffect, useState } from "react";

import Projects from "../components/projects";
import config from "../config/github"
import useGithub from "../hooks/useGithub";

const Portfolio = () => {
    const { getFiles, getRepoInfo } = useGithub(config.user);
    const [page, setPage] = useState(0);
    const [projects, setProjects] = useState(new Set());

    useEffect(() => {
        getFiles(config.repo, "gh-projects", page).then( (projects) => setProjects(p => new Set([...p, ...projects])) );
    }, [getFiles, page])

    return (
        <section id="projects" className="flex flex-col justify-center items-center min-h-view">                
            <Projects />
        </section>
    )
}

export default Portfolio;