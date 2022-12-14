import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import config from "../../config/github"
import useGithub from "../../hooks/useGithub";
import useMDX from "../../hooks/useMdx";

const Projects = ({ page=0, limit=10 }) => {
    const { getFiles, getRepoInfo, getMedia } = useGithub(config.user, config.repo);
    const { parseMDX } = useMDX();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        getFiles(config.repo, "gh-projects", page, limit).then( async (projects) => {
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
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            { projects && projects.map( (project, index) => {
                return <ProjectCard 
                            key={index}
                            project={ project }
                            maximized={ pathname === `/portfolio/${project.slug}` } 
                            onClick={ () => navigate(`/portfolio/${project.slug}`, { state: { background: pathname }})}
                            onClose={ () => { navigate(-1) } }
                        />
            })}
        </div>
    )
}

export default Projects