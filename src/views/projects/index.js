import { useEffect, useState, useEffect } from "react";
import { getFiles } from "../../utils/github";

const Projects = () => {
    const [page, setPage] = useState(0);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(p => [...p, getFiles("gh-projects", page)])
    }, [page])

    return (
        <>
        </>
    )
}

export default Projects;