import { useEffect, useState } from "react";

import { getFiles } from "../../utils/github";

const Projects = () => {
    const [page, setPage] = useState(0);
    const [projects, setProjects] = useState(new Set());

    useEffect(() => {
        getFiles("gh-projects", page).then( (projects) => setProjects(p => new Set([...p, ...projects])) );
    }, [page])

    return (
        <>
        </>
    )
}

export default Projects;