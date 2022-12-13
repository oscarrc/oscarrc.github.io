import * as runtime from "react/jsx-runtime";

import { useEffect, useState } from "react";

import Projects from "../components/projects";
import config from "../config/github"
import useGithub from "../hooks/useGithub";
import useMDX from "../hooks/useMdx";

const Portfolio = () => {
    const { getFiles, getRepoInfo, getMedia } = useGithub(config.user, config.repo);
    const { parseMDX } = useMDX();

    const [ page, setPage ] = useState(0);
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        getFiles(config.repo, "gh-projects", page).then( async (projects) => {
            const parsed = await Promise.all(projects.map(async p => {
                const evaluated = await parseMDX(p);
                evaluated.info = await getRepoInfo(evaluated.repo);
                evaluated.image = await getMedia(evaluated.image, "gh-projects");
                return evaluated;
            }))   

            setProjects(p => [...p, ...parsed])
        } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <section id="projects" className="flex flex-col justify-center items-center min-h-view">
            <Projects projects={ projects } />
        </section>
    )
}

export default Portfolio;