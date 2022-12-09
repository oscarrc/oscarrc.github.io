import { useEffect, useState } from "react";

import config from "../../config/github"
import useGithub from "../../hooks/useGithub";

const Projects = () => {
    const { getFiles, getRepoInfo } = useGithub(config.user);
    const [page, setPage] = useState(0);
    const [projects, setProjects] = useState(new Set());

    useEffect(() => {
        getFiles(config.repo, "gh-projects", page).then( (projects) => setProjects(p => new Set([...p, ...projects])) );
    }, [getFiles, page])

    return (
        <></>
    )
}

export default Projects;