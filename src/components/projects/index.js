import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import config from "../../config/github"
import useGithub from "../../hooks/useGithub";
import useMDX from "../../hooks/useMdx";

const Projects = ({ page=0, limit=10 }) => {
    const { getFiles, getRepoInfo, getMedia } = useGithub(config.user, config.repo);

    const { parseMDX } = useMDX();
    const { pathname } = useLocation();
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const [ projects, setProjects ] = useState([]);
    const [ project, setProject ] = useState(null);

    const maximize = (project) => {
        setProject(project);
        navigate(`/portfolio/${project.slug}`, { state: { background: pathname }})
    }

    useEffect(() => {
        getFiles(config.repo, "gh-projects", page, limit).then( async (projects) => {
            const parsed = await Promise.all(projects.map(async p => {
                const evaluated = await parseMDX(p);
                evaluated.info = await getRepoInfo(evaluated.repo);
                evaluated.image = await getMedia(evaluated.image, "gh-projects");
                evaluated.slug === slug && setProject(evaluated);
                return evaluated;
            }))   

            setProjects(p => [...p, ...parsed])
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <div className="w-three-quarter mx-auto grid grid-cols grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-8">
            { projects && projects.map( (project, index) => {
                return <ProjectCard 
                            key={index}
                            project={ project }
                            onClick={ () => maximize(project) }
                        />
            })}
            <Outlet context={{ project, setProject }}/>
        </div>
    )
}

export default Projects